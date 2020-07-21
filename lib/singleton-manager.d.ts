import { Singleton, Status } from './types';
declare type UseWatcher = (done: () => void) => void;
export declare class SingletonManager {
    private singletonManager;
    status: Status;
    key: string;
    constructor();
    setValue<C extends Singleton>(singletonManager: C): void;
    getProps(): {
        singleton: any;
        status: Status;
        key: string;
    };
}
export declare function createSingleton(): {
    useWatcher: (method: UseWatcher) => void;
    setValue<C extends Singleton>(classValue: C): void;
};
export {};
