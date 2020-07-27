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

    public testData: TestData = {
      name: null,
      age: null,
    }

    public updateTestData(name: string, age: number) {
      useWatcher((done) => {
        this.testData = {
          name,
          age,
        }
        done()
      })
    }
  }
  setValue(TestSingleton)

  return TestSingleton
}
