<img src='https://user-images.githubusercontent.com/3761994/88225017-2f31fd80-cc40-11ea-867d-5f0b7bdfd23c.jpg' height='60' alt='Rehoc Logo' />

# Reactive Singleton

![Tests status](https://github.com/wpdas/reactive-singleton/workflows/tests/badge.svg)
[![npm version](https://badge.fury.io/js/reactive-singleton.svg)](https://www.npmjs.com/package/reactive-singleton)
[![downloads](https://badgen.net/npm/dt/reactive-singleton)](https://www.npmjs.com/package/reactive-singleton)
![Minified size](https://badgen.net/bundlephobia/min/reactive-singleton)
![ES6 Javascript support](https://badgen.net/badge/icon/javascript?icon=kofi&label)
![Typescript support](https://badgen.net/badge/icon/typescript?icon=typescript&label)

This is a tool to help you use the Singleton pattern within the React environment. Singleton classes can be used but will not be reactive when any instance attribute is changed. Reactive Singleton comes to solve this problem providing support to Typescript and Javascript projects.

## Table of contents

- [Installation](#green_book-installation)
- [Main Resources](#gear-main-resources)
  - [API](#api)
  - [Hooks](#hooks)
  - [Higher-Order Component (HOC)](#HOC)
- [Live Demos](#eyes-live-demos)
- [Limitations](#stop_sign-limitations)
- [Changelogs](#notebook-changelogs)
- [License](#scroll-license)

## :green_book: Installation

To install the stable version:

Npm:

```sh
npm i reactive-singleton
```

Yarn:

```sh
yarn add reactive-singleton
```

## :gear: Main Resources

### API

**createSingleton**

```ts
const { watch, setClass } = createSingleton()

class MySingleton {
  private static instance: MySingleton
  public static getInstance(): MySingleton {
    if (!MySingleton.instance) {
      MySingleton.instance = new MySingleton()
    }
    return MySingleton.instance
  }
  public name = 'old name'
  public updateData() {
    /* when data needs to be changed */
    watch((done) => {
      this.name = 'new name'
      done() // Notifies the Singleton Provider
    })
  }
}
/* some singleton class */
setClass(MySingleton)
```

Used to make the Singleton Pattern be listened to by React. You can implement the Singleton class as usual. After implementing the class, you have to use the first important API resource, it is `createSingleton`. After calling the `createSingleton()` method, it'll return the necessary methods to make your service (singleton) works within React:

- `watch`: Must be used when data needs to be updated inside the singleton class and watched by React;
- `setClass`: Receives the singleton class as parameter. E.g: `setClass(MySingletonClass)`.

### Hooks

**useSingletonStatus**

```ts
const status = useSingletonStatus(MySingleton) // "ready" or "in_progress"
```

This hook will let the app know the current status of a specific singleton's process. Returns "in_progress" when singleton's values are being changed and "ready" when it has been updated.

E.g:

```tsx
const MyApp = () => {
  // Will return "ready" before useEffect block
  // Will return "in_progress" after useEffect block
  // Will return "ready" after the data be updated inside the singleton instance
  const status = useSingletonStatus(MySingleton)

  const singletonData = MySingleton.getInstance()
  useEffect(() => {
    singletonData.updateData()
  }, [])

  return (/* component elements */)
}
```

**useWasDataUpdated**

```ts
const wasDataUpdated = useWasDataUpdated(MySingleton) // true or false

// You can optionally define the verification interval (debounce). Default is 500ms
const wasDataUpdated = useWasDataUpdated(MySingleton, 1000) // true or false
```

Lets the app know if the singleton data was updated. Returns `true` or `false` (boolean).

E.g:

```tsx
const MyApp = () => {
  // Returns 'false' before useEffect block
  // Returns 'true' after useEffect block
  const wasDataUpdated = useWasDataUpdated(MySingleton)

  const singletonData = MySingleton.getInstance()
  useEffect(() => {
    singletonData.updateData()
  }, [])

  return (/* component elements */)
}
```

**useReRenderOnUpdate**

```ts
useReRenderOnUpdate(MySingleton) // Makes the component re-render every time the Singleton props are updated
```

The Singleton props can be modified in any level of the app and this hook makes the component re-render every time the props of the Singleton Class are updated. Useful for cases where a component is only reading the Singleton props.
The props read by the component will always have the most updated data provided by the Singleton.

E.g:

```tsx
const MyApp = () => {
  useReRenderOnUpdate(MySingleton)
  const { a, b } = MySingleton.getInstance()

  console.log(a, b) // Will always have the most updated data

  return (/* component elements */)
}
```

_Note_: You don't need to use this hook if you're using one of the following resources: `withSingleton` or `useSingletonStatus`.

### HOC

**withSingleton**

The `withSingleton` HOC works the same way as `useReRenderOnUpdate` Hook. Every time that the Singleton props are changed, the component will re-render using the most updated data provided by the Singleton.

E.g:

```tsx
const MyComponent = () => {
  const { a, b } = MySingleton.getInstance()
  console.log(a, b) // Will always have the most updated data

  return (/* component elements */)
}

export default withSingleton(MyComponent, MySingleton)
```

_Note_: You don't need to use this HOC if you're using one of the following resources: `useReRenderOnUpdate` or `useSingletonStatus`.

That's basically this. Feel free to check out the live demos for a better understanding.

## :eyes: Live Demos

- Using Typescript: [TypeScript Example - CodeSandBox](https://codesandbox.io/s/reactive-singleton-typescript-ibfu3)

- Using Javascript (ES6): [JavaScript Example - CodeSandBox](https://codesandbox.io/s/reactive-singleton-javascript-39mmq)

- [See more examples here](https://github.com/Wpdas/reactive-singleton/blob/master/EXAMPLES.md)

## :stop_sign: Limitations

The only limitation here is, **SINGLETON`S METHODS CAN NOT BE DESTRUCTURED**. So, use them like:

```ts
  const singletonData = MySingleton.getInstance()
  // (!) Methods can't be destructured
  singletonData.updateData()
}
```

## :notebook: Changelogs

### v2.0.3

- A few modules were updated.

### v2.0.2

- Updated important dependencies modules to improve security.

### v2.0.0

- SingletonProvider removed. This is no longer necessary due to changes in performance.

### v2.0.0-rc2

- Fixed the error message that was using an old resource reference

### v2.0.0-rc1

- Fixed the issue that was causing this error: React Hook "useWatcher" cannot be called in a class component. React Hooks must be called in a React function component or a custom React Hook function.
- The main API resources provided by `createSingleton()` was using a resouce called `useWatcher` to be used inside the Singleton Classes, however this went against React Hooks rules. `useWatcher` was renamed to `watch` and the `setValue` was renamed to `setClass`. So that, the usage of `createSingleton()` should be used like:

```ts
const { watch, setClass } = createSingleton()
```

- Fixed the issue that caused components to re-render more than necessary when using hooks
- Added new hook: `useReRenderOnUpdate`
- Added new HOC: `withSingleton`
- New tests

### v1.1.7

- Fixed issue caused by multiple react-dom for ES6

### v1.1.6

- Peer dependencies changed
- Debounce added to useWasDataUpdated hook

### v1.0.5

- Tests
- CI
- Readme doc improved

### v1.0.4

- Order of rendering fixed

### v1.0.3

- Final bundle size was reduced
- Added JSDoc annotations
- Minified bundle
- Merged declarations

### v1.0.0

- First release;

## :scroll: License

MIT
