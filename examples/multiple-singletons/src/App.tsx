import React, { useEffect } from 'react'
import { useSingletonStatus } from 'reactive-singleton'
import ServiceA from './singletons/ServiceA'
import ServiceB from './singletons/ServiceB'

const App = () => {
  // Gets Singleton's instance
  const serviceA = ServiceA.getInstance()
  const serviceAStatus = useSingletonStatus(ServiceA)
  const serviceB = ServiceB.getInstance()
  const serviceBStatus = useSingletonStatus(ServiceB)

  console.log(serviceA, serviceAStatus, serviceB, serviceBStatus)

  useEffect(() => {
    setTimeout(() => {
      serviceA.updateUserData('Wenderson', 30)
    }, 2000)
  }, [serviceA])

  useEffect(() => {
    console.log(serviceAStatus)
  }, [serviceAStatus])

  return (
    <div>
      <span>USER DATA</span>
    </div>
  )
}

export default App
