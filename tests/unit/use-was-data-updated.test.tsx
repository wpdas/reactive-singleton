import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import * as module from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'

test('useWasDataUpdated hook', (done) => {
  const singleton = module.createSingleton()
  const TestSingleton = initTestSingletonClass(
    singleton.setValue,
    singleton.useWatcher
  )
  const useWasDataUpdatedSpy = jest.spyOn(module, 'useWasDataUpdated')

  const TestAppState = () => {
    const wasUpdated = module.useWasDataUpdated(TestSingleton, 0)
    const testSingleton = TestSingleton.getInstance()
    testSingleton.updateTestData('User', 34)

    useEffect(() => {
      if (wasUpdated) {
        expect(useWasDataUpdatedSpy).toReturnWith(true)
        done()
      } else {
        expect(useWasDataUpdatedSpy).toReturnWith(false)
        testSingleton.updateTestData('User', 34)
      }
    }, [wasUpdated, testSingleton])

    return (
      <module.SingletonProvider>
        <div />
      </module.SingletonProvider>
    )
  }
  render(<TestAppState />)
})
