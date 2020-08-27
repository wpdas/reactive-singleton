/// <reference types="react" />
import React from "react";
type Status = "in_progress" | "ready";
type UseWatcher = (done: () => void) => void;
declare function createSingleton(): {
    watch: (method: UseWatcher) => void;
    setClass<C>(classValue: C): void;
};
declare function useSingletonStatus<C>(singletonClass: C): Status;
declare function useReRenderOnUpdate<C>(singletonClass: C): void;
declare function useWasDataUpdated<C>(singletonClass: C, debounceDelay?: number): boolean;
declare function withSingleton<T, C>(Component: React.ComponentType<T> | React.FC<T>, singletonClass: C): (props: T) => JSX.Element;
export { Status, createSingleton, useSingletonStatus, useReRenderOnUpdate, useWasDataUpdated, withSingleton };
