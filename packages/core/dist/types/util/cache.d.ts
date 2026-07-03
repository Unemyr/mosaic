export function lruCache({ max, ttl }?: {
    max?: number;
    ttl?: number;
}): {
    get(key: any): any;
    set(key: any, value: any): any;
    clear(): void;
};
export function voidCache(): {
    get: () => any;
    set: (key: any, value: any) => any;
    clear: () => void;
};
