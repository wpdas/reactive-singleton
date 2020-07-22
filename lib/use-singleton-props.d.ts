export declare function useSingletonProps<C>(singletonClass: C): {
    status: import("./types").Status;
    statusObservable: import("./observable").default<import("./types").Status>;
};
