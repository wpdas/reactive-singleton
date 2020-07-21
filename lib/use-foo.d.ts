export declare function useFoo<C>(singletonClass: C): {
    singleton: C;
    singletonStatus: import("./types").Status;
    managerStatus: import("./types").Status;
};
