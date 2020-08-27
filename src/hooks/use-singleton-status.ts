import { useState, useEffect } from 'react'
import { getSingletonManager } from '../get-singleton-manager'
import { Status } from '../types'

/**
 * This hook will let the app know the current status of a specific Singleton's process.
 * Returns "in_progress" when Singleton's values are being changed and "ready"
 * when it has been updated.
 *
 * @param singletonClass Singleton class
 */
export function useSingletonStatus<C>(singletonClass: C) {
  const { status: initialStatus, observable } = getSingletonManager(
    singletonClass
  )
  const [status, setStatus] = useState<Status>(initialStatus)

  useEffect(() => {
    const updateStatus = (currentStatus: Status) => {
      // Avoid causing update component issue when this hooks is being used more than once
      setTimeout(() => {
        setStatus(currentStatus)
      }, 0)
    }
    observable.subscribe(updateStatus)
    return () => {
      observable.unsubscribe(updateStatus)
    }
  }, [observable, status])

  return status
}
