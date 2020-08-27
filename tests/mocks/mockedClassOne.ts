// Singleton Class - Mock
export const initTestSingletonClass = (setClass: Function, watch: Function) => {
  type TestData = {
    name: string | null
    age: number | null
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
      watch((done) => {
        this.testData = {
          name,
          age,
        }
        done()
      })
    }
  }
  setClass(TestSingleton)

  return TestSingleton
}
