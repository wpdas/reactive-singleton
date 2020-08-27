import React from 'react'
import { useReRenderOnUpdate } from '../hooks/use-re-render-on-update'

/**
 * Re-render with new props when singleton props are updated
 * @param Component React component
 * @param singletonClass  Singleton class
 */
export function withSingleton<T, C>(
  Component: React.ComponentType<T> | React.FC<T>,
  singletonClass: C
) {
  return (props: T) => {
    useReRenderOnUpdate(singletonClass)
    return <Component {...props} />
  }
}
