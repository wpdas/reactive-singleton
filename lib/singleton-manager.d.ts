import { Status } from './types';
export declare class SingletonManager {
    private singletonClass;
    status: Status;
    key: string;
    constructor();
    setValue<C>(singletonClass: C): void;
    getProps(): {
        singleton: any;
        status: Status;
        key: string;
    };
}
