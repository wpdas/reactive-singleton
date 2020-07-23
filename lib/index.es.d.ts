/// <reference types="react" />
import React from "react";
type Status = "in_progress" | "ready";
interface SingletonProviderProps {
    readonly children: React.ReactNode;
}
declare const SingletonProvider: ({ children }: SingletonProviderProps) => JSX.Element;
type UseWatcher = (done: () => void) => void;
declare function createSingleton(): {
    useWatcher: (method: UseWatcher) => void;
    setValue<C>(classValue: C): void;
};
declare function useSingletonStatus<C>(singletonClass: C): Status;
declare function useWasDataUpdated<C>(singletonClass: C): boolean;
export { Status, SingletonProvider, createSingleton, useSingletonStatus, useWasDataUpdated };
