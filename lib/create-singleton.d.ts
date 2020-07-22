declare type UseWatcher = (done: () => void) => void;
export declare function createSingleton(): {
    useWatcher: (method: UseWatcher) => void;
    setValue<C>(classValue: C): void;
};
export {};
