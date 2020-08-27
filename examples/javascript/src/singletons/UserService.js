//ES6
import { createSingleton } from 'reactive-singleton'
const { watch, setClass } = createSingleton()

class UserService {
  static _instance = null

  static getInstance() {
    if (!UserService._instance) {
      UserService._instance = new UserService()
    }
    return UserService._instance
  }

  user = {
    name: null,
    email: null,
    token: null,
    isAllowed: false,
    last_access: null,
  }

  constructor() {
    this._setUserInitialAccess()
  }

  // It´s still possible to do no reactive changes
  // ES6 private function
  _setUserInitialAccess() {
    this.user = {
      ...this.user,
      last_access: new Date(),
    }
  }

  _fetchLoginData(email, password) {
    // Fake API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (password && email) {
          resolve({
            name: 'Wenderson Pires',
            token: Math.random()
              .toString(36)
              .substr(2, 9),
          })
        }
      }, 2000)
    })
  }

  login(email, password) {
    // Reactive changes
    watch(async (done) => {
      const { name, token } = await this._fetchLoginData(email, password)
      this.user = {
        ...this.user,
        email,
        name,
        token,
        isAllowed: true,
      }

      // Must call in order to dispatch changes
      done()
    })
  }
}

setClass(UserService)

export default UserService
