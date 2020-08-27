import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import * as module from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'

test('withSingleton HOC', (done) => {
  const singleton = module.createSingleton()
  const TestSingleton = initTestSingletonClass(
    singleton.setClass,
    singleton.watch
  )
  const withSingleton = jest.spyOn(module, 'withSingleton')

  const TestAppState = () => {
    const testSingleton = TestSingleton.getInstance()

    useEffect(() => {
      testSingleton.updateTestData('User', 34)
    }, [testSingleton])

    useEffect(() => {
      if (
        testSingleton.testData.name === 'User' &&
        testSingleton.testData.age === 34
      ) {
        expect(withSingleton).toBeCalledWith(TestAppState, TestSingleton)
        done()
      }
    }, [testSingleton])

    return <div />
  }

  const TestAppStateWithSingleton = module.withSingleton(
    TestAppState,
    TestSingleton
  )

  render(<TestAppStateWithSingleton />)
})
