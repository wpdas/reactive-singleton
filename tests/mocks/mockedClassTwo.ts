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

    constructor() {
      this.updateWithDelay('Wendz')
    }

    public testData: TestData = {
      name: null,
      age: null,
    }

    public updateWithDelay(name: string) {
      watch((done) => {
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
  setClass(TestSingleton)

  return TestSingleton
}
