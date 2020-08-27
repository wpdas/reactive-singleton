import { createSingleton } from 'reactive-singleton'
const { watch, setClass } = createSingleton()

class ServiceA {
  private static instance: ServiceA
  public static getInstance(): ServiceA {
    if (!ServiceA.instance) {
      ServiceA.instance = new ServiceA()
    }
    return ServiceA.instance
  }

  public name: string | null = null
  public age: number | null = null
  public updateUserData(name: string, age: number) {
    watch((done) => {
      // setTimeout(() => {
      this.name = name
      this.age = age
      done()
      // }, 3000)
    })
  }
}

setClass(ServiceA)

export default ServiceA
