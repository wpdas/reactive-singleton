import { SingletonManager } from './singleton-manager'
import { getObservable } from './observable-keys'
import { addSingletonManager } from './singleton-keys'

type UseWatcher = (done: () => void) => void

/**
 * createSingleton hook returns the necessary methods to make your service
 * (singleton) works within React.
 */
export function createSingleton() {
  const newSingleton = new SingletonManager()

  return {
    /**
     * Watches the changes that are being made inside the singleton.
     * A "done" method is provided, you must call it when the necessary
     * data is updated so that, React will be notified. This function
     * supports sync and async calls.
     */
    watch: (method: UseWatcher) => {
      const observable = getObservable(newSingleton.key)
      newSingleton.status = 'in_progress'
      observable.notify(newSingleton.status)
      method(() => {
        newSingleton.status = 'ready'
        observable.notify(newSingleton.status)
      })
    },

    /**
     * Set the Singleton Class. You must pass your singleton as parameter to this function.
     */
    setClass<C>(classValue: C) {
      newSingleton.setClass(classValue)
      addSingletonManager((classValue as any).name, newSingleton)
    },
  }
}
