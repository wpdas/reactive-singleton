class Observable<D> {
  private observers: Array<(data: D) => void>

  constructor() {
    this.observers = []
  }

  subscribe(handler: (data: D) => void) {
    this.observers.push(handler)
  }

  unsubscribe(handler: (data: D) => void) {
    this.observers = this.observers.filter(
      (subscriber) => subscriber !== handler
    )
  }

  notify(data: D) {
    this.observers.forEach((observer) => observer(data))
  }
}

export default Observable
