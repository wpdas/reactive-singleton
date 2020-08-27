import { getSingletonManager as getSM } from './singleton-keys'
import { getObservable } from './observable-keys'
import { Status } from './types'

/**
 * Gets a singleton manager (SingletonManager) with its props: singleton itself, status and key
 *
 * @param {C} singletonManager Singleton class or object
 */
export function getSingletonManager<C>(singletonManager: C) {
  const singletonKey = (singletonManager as any).name
  const currentSingleton = getSM(singletonKey)

  if (!currentSingleton) {
    throw new Error(
      `${singletonKey} singleton was not correctly initialized or doesn't exist! Please, create your Singleton using the createSingleton() feature: setClass.`
    )
  }

  const { singleton, status, key } = currentSingleton!.getProps()

  return {
    singleton: singleton as C,
    status: status as Status,
    observable: getObservable(key),
  }
}
