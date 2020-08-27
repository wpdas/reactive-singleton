import Observable from './observable'
import { Status } from './types'

// Controls the observables (for status) that are being used inside every Singleton class
let observableKeys = {}

/**
 * Get singleton's observable.
 * @param {string} key
 */
export const getObservable = (key: string) =>
  observableKeys[key] as Observable<Status>

/**
 * Add new singleton's observable
 * @param {string} key
 * @param {Observable<Status>} observable
 */
export const addObservable = (key: string, observable: Observable<Status>) => {
  observableKeys = {
    ...observableKeys,
    [key]: observable,
  }
}

/**
 * Get all singleton's observables keys
 */
export const getObservablesKeys = () => Object.keys(observableKeys)
