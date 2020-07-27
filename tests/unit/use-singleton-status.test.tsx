import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import * as module from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'
import { initTestSingletonClass as initTestSingletonClassWithDelay } from '../mocks/mockedClassTwo'

test('useSingletonStatus hook - in_progress', (done) => {
  const singleton = module.createSingleton()
  const TestSingletonOne = initTestSingletonClassWithDelay(
    singleton.setValue,
    singleton.useWatcher
  )
  const useSingletonStatusSpy = jest.spyOn(module, 'useSingletonStatus')

  const TestApp = () => {
    const testSingleton = TestSingletonOne.getInstance()
    const status: module.Status = module.useSingletonStatus(TestSingletonOne)
    useEffect(() => {
      done()
    }, [status, testSingleton])
    return null
  }

  const TestAppWithProvider = () => (
    <module.SingletonProvider>
      <TestApp />
    </module.SingletonProvider>
  )

  render(<TestAppWithProvider />)
  expect(useSingletonStatusSpy).toReturnWith('in_progress')
})

test('useSingletonStatus hook - ready', () => {
  const singleton = module.createSingleton()
  const TestSingletonTwo = initTestSingletonClass(
    singleton.setValue,
    singleton.useWatcher
  )
  const useSingletonStatusSpy = jest.spyOn(module, 'useSingletonStatus')

  const TestAppStateOne = () => {
    module.useSingletonStatus(TestSingletonTwo)

    return (
      <module.SingletonProvider>
        <div />
      </module.SingletonProvider>
    )
  }
  render(<TestAppStateOne />)
  expect(useSingletonStatusSpy).toReturnWith('ready')
})
