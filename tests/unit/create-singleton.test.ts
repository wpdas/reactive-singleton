import { createSingleton } from '../../lib'
import { initTestSingletonClass } from '../mocks/mockedClassOne'

const singleton = createSingleton()

test('createSingleton factory: useWatcher hook and setValue method', () => {
  const setValueSpy = jest.spyOn(singleton, 'setValue')
  const useWatcherSpy = jest.spyOn(singleton, 'useWatcher')

  const TestSingleton = initTestSingletonClass(
    singleton.setValue,
    singleton.useWatcher
  )

  // Testing
  const testSingletonA = TestSingleton.getInstance()
  expect(testSingletonA.testData.name).toBeNull()
  expect(testSingletonA.testData.age).toBeNull()
  testSingletonA.updateTestData('Wenderson', 30)

  const testSingletonB = TestSingleton.getInstance()
  expect(testSingletonB.testData.name).toStrictEqual('Wenderson')
  expect(testSingletonB.testData.age).toStrictEqual(30)
  expect(useWatcherSpy).toHaveBeenCalledTimes(1)
  expect(setValueSpy).toHaveBeenCalledWith(TestSingleton)
  testSingletonA.updateTestData('Pires', 29)
  expect(useWatcherSpy).toHaveBeenCalledTimes(2)
})
