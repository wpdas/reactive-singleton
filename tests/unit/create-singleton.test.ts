import { createSingleton } from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'

const singleton = createSingleton()

test('createSingleton factory: watch hook and setClass method', () => {
  const setClassSpy = jest.spyOn(singleton, 'setClass')
  const watchSpy = jest.spyOn(singleton, 'watch')

  const TestSingleton = initTestSingletonClass(
    singleton.setClass,
    singleton.watch
  )

  // Testing
  const testSingletonA = TestSingleton.getInstance()
  expect(testSingletonA.testData.name).toBeNull()
  expect(testSingletonA.testData.age).toBeNull()
  testSingletonA.updateTestData('Wenderson', 30)

  const testSingletonB = TestSingleton.getInstance()
  expect(testSingletonB.testData.name).toStrictEqual('Wenderson')
  expect(testSingletonB.testData.age).toStrictEqual(30)
  expect(watchSpy).toHaveBeenCalledTimes(1)
  expect(setClassSpy).toHaveBeenCalledWith(TestSingleton)
  testSingletonA.updateTestData('Pires', 29)
  expect(watchSpy).toHaveBeenCalledTimes(2)
})
