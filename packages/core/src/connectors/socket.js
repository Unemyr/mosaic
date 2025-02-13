import { decodeIPC } from '../util/decode-ipc.js';

export function socketConnector(uri = 'ws://localhost:3000/') {
  const queue = [];
  let connected = false;
  let request = null;
  let ws;

  const events = {
    open() {
      connected = true;
      next();
    },

    close() {
      connected = false;
      request = null;
      ws = null;
      while (queue.length) {
        queue.shift().reject('Socket closed');
      }
    },

    error(event) {
      if (request) {
        const { reject } = request;
        request = null;
        next();
        reject(event);
      } else {
        console.error('WebSocket error: ', event);
      }
    },

    message({ data }) {
      if (request) {
        const { query, resolve, reject } = request;

        // clear state, start next request
        request = null;
        next();

        // process result
        if (typeof data === 'string') {
          const json = JSON.parse(data);
          json.error ? reject(json.error) : resolve(json);
        } else if (query.type === 'exec') {
          resolve();
        } else if (query.type === 'arrow') {
          resolve(decodeIPC(data));
        } else {
          throw new Error(`Unexpected socket data: ${data}`);
        }
      } else {
        console.log('WebSocket message: ', data);
      }
    }
  }

  function init() {
    ws = new WebSocket(uri);
    ws.binaryType = 'arraybuffer';
    for (const type in events) {
      ws.addEventListener(type, events[type]);
    }
  }

  function enqueue(query, resolve, reject) {
    if (ws == null) init();
    queue.push({ query, resolve, reject });
    if (connected && !request) next();
  }

  function next() {
    if (queue.length) {
      request = queue.shift();
      ws.send(JSON.stringify(request.query));
    }
  }

  return {
    get connected() {
      return connected;
    },
    /**
     * Query the DuckDB server.
     * @param {object} query
     * @param {'exec' | 'arrow' | 'json' | 'create-bundle' | 'load-bundle'} [query.type] The query type.
     * @param {string} [query.sql] A SQL query string.
     * @param {string[]} [query.queries] The queries used to create a bundle.
     * @param {string} [query.name] The name of a bundle to create or load.
     * @returns the query result
     */
    query(query) {
      return new Promise(
        (resolve, reject) => enqueue(query, resolve, reject)
      );
    }
  };
}
