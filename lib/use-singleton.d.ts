export declare function useSingleton<C>(singletonManager: C): {
    singleton: C;
    singletonStatus: import("./types").Status;
    singletonStatusObservable: import("./observable").default<import("./types").Status>;
    managerStatus: "in_progress" | "ready" | "next_status";
};
