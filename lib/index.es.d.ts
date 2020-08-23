/// <reference types="react" />
import React from 'react'

type Status = 'in_progress' | 'ready'
interface SingletonProviderProps {
  readonly children: React.ReactNode
}

/**
 * The main service provider
 */
declare const SingletonProvider: ({
  children,
}: SingletonProviderProps) => JSX.Element
type UseWatcher = (done: () => void) => void

/**
 * createSingleton hook returns the necessary methods to make your service
 * (singleton) works within React.
 *
 * - watch: Watches the changes that are being made inside the singleton.
 * A "done" method is provided, you must call it when the necessary
 * data is updated so that, React will be notified. This function
 * supports sync and async calls.
 *
 * - setClass: Set the Singleton Class. You must pass your singleton as parameter to this function.
 */
declare function createSingleton(): {
  watch: (method: UseWatcher) => void
  setClass<C>(classValue: C): void
}

/**
 * This hook will let the app know the current status of a specific Singleton's process.
 * Returns "in_progress" when Singleton's values are being changed and "ready"
 * when it has been updated.
 *
 * @param singletonClass Singleton class
 */
declare function useSingletonStatus<C>(singletonClass: C): Status

/**
 * Re-render with new props when singleton props are updated
 * @param singletonClass Singleton class
 */
declare function useReRenderOnUpdate<C>(singletonClass: C): void

/**
 * This hook lets the app know when the Singleton is not using default
 * (data stored at the moment this hook was used) props any more.
 * Returns true or false.
 *
 * @param singletonClass Singleton class
 * @param debounceDelay The debounce delay used to define if data was updated (default: 500)
 */
declare function useWasDataUpdated<C>(
  singletonClass: C,
  debounceDelay?: number
): boolean

/**
 * Re-render with new props when singleton props are updated
 * @param Component React component
 * @param singletonClass  Singleton class
 */
declare function withSingleton<T, C>(
  Component: React.ComponentType<T> | React.FC<T>,
  singletonClass: C
): (props: T) => JSX.Element

export {
  Status,
  SingletonProvider,
  createSingleton,
  useSingletonStatus,
  useReRenderOnUpdate,
  useWasDataUpdated,
  withSingleton,
}
