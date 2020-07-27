// Singleton Class - Mock
export const initTestSingletonClass = (
  setValue: Function,
  useWatcher: Function
) => {
  type TestData = {
    name: string
    age: number
  }

  class TestSingleton {
    private static instance: TestSingleton

    public static getInstance() {
      if (!TestSingleton.instance) {
        TestSingleton.instance = new TestSingleton()
      }
      return TestSingleton.instance
    }

    constructor() {
      this.updateWithDelay('Wendz')
    }

    public testData: TestData = {
      name: null,
      age: null,
    }

    public updateWithDelay(name: string) {
      useWatcher((done) => {
        setTimeout(() => {
          this.testData = {
            ...this.testData,
            name,
          }
          done()
        }, 500)
      })
    }
  }
  setValue(TestSingleton)

  return TestSingleton
}
