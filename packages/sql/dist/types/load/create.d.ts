export function createTable(name: any, query: any, { replace, temp, view }?: {
    replace?: boolean;
    temp?: boolean;
    view?: boolean;
}): string;
export function createSchema(name: any, { strict }?: {
    strict?: boolean;
}): string;
