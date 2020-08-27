import { SingletonManager } from './singleton-manager'

let singletonManagerKeys = {}

/**
 * Add new singleton
 * @param {string} key
 * @param {SingletonManager} singletonManager
 */
export const addSingletonManager = (
  key: string,
  singletonManager: SingletonManager
) => {
  singletonManagerKeys = {
    ...singletonManagerKeys,
    [key]: singletonManager,
  }
}

/**
 * Get singleton
 * @param {string} key
 */
export const getSingletonManager = (key: string) =>
  singletonManagerKeys[key] as SingletonManager

/**
 * Get all singleton managers keys
 */
export const getSingletonManagersKeys = () => Object.keys(singletonManagerKeys)
