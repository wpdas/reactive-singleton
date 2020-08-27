import { createSingleton } from 'reactive-singleton'
const { watch, setClass } = createSingleton()

class ServiceB {
  private static instance: ServiceB
  public static getInstance(): ServiceB {
    if (!ServiceB.instance) {
      ServiceB.instance = new ServiceB()
    }
    return ServiceB.instance
  }

  public city: string | null = null
  public country: string | null = null
  public updateLocation(city: string, country: string) {
    watch((done) => {
      this.city = city
      this.country = country
      done()
    })
  }
}

setClass(ServiceB)

export default ServiceB
