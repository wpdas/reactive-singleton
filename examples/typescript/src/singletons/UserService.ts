import { createSingleton } from 'reactive-singleton'
const { watch, setClass } = createSingleton()

interface User {
  name?: string | null
  email?: string | null
  token?: string | null
  isAllowed: boolean
  last_access?: Date | null
}

interface FakeAPIResponse {
  name: string
  token: string
}

export interface UserServiceProps {
  readonly user: User
}

class UserService implements UserServiceProps {
  private static instance: UserService

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService()
    }
    return UserService.instance
  }

  public user: User = {
    isAllowed: false,
  }

  constructor() {
    this.setUserInitialAccess()
  }

  // It´s still possible to do no reactive changes
  private setUserInitialAccess() {
    this.user = {
      ...this.user,
      last_access: new Date(),
    }
  }

  private fetchLoginData(
    email: string,
    password: string
  ): Promise<FakeAPIResponse> {
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

  public login(email: string, password: string) {
    // Use watch for reactive changes
    watch(async (done) => {
      const { name, token } = await this.fetchLoginData(email, password)
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
