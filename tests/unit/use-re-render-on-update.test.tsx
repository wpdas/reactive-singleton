import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import * as module from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'

test('useReRenderOnUpdate hook', (done) => {
  const singleton = module.createSingleton()
  const TestSingleton = initTestSingletonClass(
    singleton.setClass,
    singleton.watch
  )
  const useReRenderOnUpdate = jest.spyOn(module, 'useReRenderOnUpdate')

  const TestAppState = () => {
    module.useReRenderOnUpdate(TestSingleton)
    const testSingleton = TestSingleton.getInstance()

    useEffect(() => {
      testSingleton.updateTestData('User', 34)
    }, [testSingleton])

    useEffect(() => {
      if (
        testSingleton.testData.name === 'User' &&
        testSingleton.testData.age === 34
      ) {
        expect(useReRenderOnUpdate).toBeCalledTimes(1)
        done()
      }
    }, [testSingleton])

    return <div />
  }
  render(<TestAppState />)
})
