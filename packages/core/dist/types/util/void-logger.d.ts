export function voidLogger(): {
    debug(..._: any[]): void;
    info(..._: any[]): void;
    log(..._: any[]): void;
    warn(..._: any[]): void;
    error(..._: any[]): void;
};
