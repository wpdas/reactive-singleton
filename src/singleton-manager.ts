import Observable from './observable'
import { Status } from './types'
import { addObservable } from './observable-keys'
import uniqueId from './unique-id'

// Internal Class to control the Singletons classes
export class SingletonManager {
  private singletonClass: any

  public status: Status = 'ready'

  public key = uniqueId()

  constructor() {
    // Create its observable status
    addObservable(this.key, new Observable<Status>())
  }

  public setClass<C>(singletonClass: C) {
    const ref = singletonClass
    this.singletonClass = ref
  }

  public getProps() {
    return {
      singleton: this.singletonClass,
      status: this.status,
      key: this.key,
    }
  }
}
