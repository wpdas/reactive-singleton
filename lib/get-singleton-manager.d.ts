import { Status } from './types';
export declare function getSingletonManager<C>(singletonManager: C): {
    singleton: C;
    status: Status;
    observable: import("./observable").default<Status>;
};
