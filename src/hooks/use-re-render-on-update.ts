import { useSingletonStatus } from './use-singleton-status'

/**
 * Re-render with new props when singleton props are updated
 * @param singletonClass Singleton class
 */
export function useReRenderOnUpdate<C>(singletonClass: C) {
  useSingletonStatus(singletonClass)
}
