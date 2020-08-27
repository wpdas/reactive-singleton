import { useEffect, useState } from 'react'
import { Status } from '../types'
import useDebounce from './use-debounce'
import { getSingletonManager } from '../get-singleton-manager'

/**
 * This hook lets the app know when the Singleton is not using default
 * (data stored at the moment this hook was used) props any more.
 * Returns true or false.
 *
 * @param singletonClass Singleton class
 */
export function useWasDataUpdated<C>(singletonClass: C, debounceDelay = 500) {
  const { observable } = getSingletonManager(singletonClass)
  const [hasUpdatedData, setHasUpdatedData] = useState(false)
  const debouncedHasUpdatedData = useDebounce(hasUpdatedData, debounceDelay)

  useEffect(() => {
    const handleOnUpdate = (status: Status) => {
      if (status === 'ready') {
        setHasUpdatedData(true)
        observable.unsubscribe(handleOnUpdate)
      }
    }

    observable.subscribe(handleOnUpdate)
    return () => {
      observable.unsubscribe(handleOnUpdate)
    }
  }, [observable])

  return debouncedHasUpdatedData
}
