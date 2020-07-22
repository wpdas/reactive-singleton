<img src='https://user-images.githubusercontent.com/3761994/88225017-2f31fd80-cc40-11ea-867d-5f0b7bdfd23c.jpg' height='60' alt='Rehoc Logo' />

# Reactive Singleton

This is a tool to help you use the Singleton pattern within the React environment. Singleton classes can be used but will not be reactive when any instance attribute is changed. Reactive Singleton comes to solve this problem.

## :green_book: Installation

To install the stable version:

Npm:

```sh
npm i reactive-singleton
```

Yarn:

```sh
npm add reactive-singleton
```

### :gear: How to use

#### 1 - Singleton implementation:

You can implement the Singleton class as usual. After implementing the class, you have to use the first important hook here, it is 'createSingleton()'. createSingleton hook returns the necessary methods to make your service (singleton) works within React, they are:

- `useWatcher`: Watch the changes that are being made inside the singleton. A "done" method is provided, you must call it when the necessary data is updated so that, React will be notified. This function supports sync and async calls.

- `setValue`: You must pass your singleton as parameter to this function.

See the example below:

```ts
import { createSingleton } from 'reactive-singleton'
const { useWatcher, setValue } = createSingleton()

// Singleton example (Typescript)
class MyService {
  private static instance: MyService

  public static getInstance(): MyService {
    if (!MyService.instance) {
      MyService.instance = new MyService()
    }
    return MyService.instance
  }

  // do stuff
  constructor() {
    /*...*/
  }

  // It´s still possible to do no reactive changes
  private doInternalStuff() {
    /*...*/
  }

  private fetchLoginData(email: string, password: string) {
    /*...*/
  }

  public login(email: string, password: string) {
    // (!) Use useWatcher for reactive changes
    useWatcher(async (done) => {
      const { name, token } = await this.fetchLoginData(email, password)
      this.user = {
        ...this.user,
        email,
        name,
        token,
        isAllowed: true,
      }

      // (!) Must call in order to dispatch changes
      done()
    })
  }
}
```

#### 2 - React setup:

Use the 'SingletonProvider' at the top level component of your application, so that, its children will be affected.

```tsx
import { SingletonProvider } from 'reactive-singleton'

//...
return (
  <SingletonProvider>
    <App />
  </SingletonProvider>
)
//...
```

Now inside the children components, you can use your singleton service (implemented previously) as usual. The only rule here is, SINGLETON`S METHODS CAN NOT BE DESTRUCTURED. So, use this like:

```ts
import UserService from '...'

const App = () => {
  const userService = UserService.getInstance()

  // Fake login. (!) Methods can't be destructured
  userService.login('user@email.com', '123456pass')
}
```

Reactive Singleton provides 2 more hooks to help you:

- `useSingletonStatus` This hook will let the app know the current status of a specific Singleton's process. Returns "in_progress" when Singleton's values are being changed and "ready" when it has updated data.

- `useWasDataUpdated` Lets the app know when the Singleton is not using default (data stored at the moment this hook was used) props anymore. Returns `true` or `false`.

Basic usage example:

```tsx
import { useSingletonStatus, useWasDataUpdated } from 'reactive-singleton'
import UserService from '...'

const App = () => {
  // Gets Singleton's instance
  const userService = UserService.getInstance()
  const userServiceStatus = useSingletonStatus(UserService)

  console.log(userServiceStatus) // "ready" or "in_progress"

  const {
    user: { name, email, token, isAllowed },
  } = userService

   useEffect(() => {
    // Immediately log in call
    userService.login('user@email.com', '123456pass')
  }, [])

  return (/*...*/)
}
```

That's basically this.

## :notebook: Changelogs

### v1.0.0

- First release;

## :scroll: License

MIT
