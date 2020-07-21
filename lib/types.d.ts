export declare type Status = 'in_progress' | 'ready';
export declare type GetInstance<T> = () => T;
export declare class Singleton {
    getInstance: GetInstance<any>;
}
