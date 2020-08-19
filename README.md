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
  - [Provider](#provider)
  - [API](#api)
  - [Hooks](#hooks)
- [Example](#writing_hand-example)
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

### Provider

**SingletonProvider**

```tsx
<>
  <SingletonProvider>
    <MyApp />
  </SingletonProvider>
</>
```

The main provider that makes all the magic happen. Use it in the top level component of your application, so that all child components are fed with the singleton instance data;

### API

**createSingleton**

```ts
const { useWatcher, setValue } = createSingleton()

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
    useWatcher((done) => {
      this.name = 'new name'
      done() // Notifies the Singleton Provider
    })
  }
}
/* some singleton class */
setValue(MySingleton)
```

Used to make the Singleton Pattern be listened to by React. You can implement the Singleton class as usual. After implementing the class, you have to use the first important API resource, it is `createSingleton`. `createSingleton` returns the necessary methods to make your service (singleton) works within React:

- `useWatcher`: Must be used when data needs to be updated inside the singleton class;
- `setValue`: Receives the singleton class as parameter. E.g: `setValue(MySingletonClass)`.

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
```

Lets the app know if the singleton data was updated after this hook has been used. Returns `true` or `false` (boolean).

E.g:

```tsx
const MyApp = () => {
  // Will return 'false' before useEffect block
  // Will return 'true' after useEffect block
  const wasDataUpdated = useWasDataUpdated(MySingleton)

  const singletonData = MySingleton.getInstance()
  useEffect(() => {
    singletonData.updateData()
  }, [])

  return (/* component elements */)
}
```

## :writing_hand: Example

Here is a simple example of how you can use all the presented resources, including a simple singleton class.

**MySingleton.ts**

```ts
import { createSingleton } from 'reactive-singleton'
const { useWatcher, setValue } = createSingleton()

class MySingleton {
  private static instance: MySingleton
  public static getInstance(): MySingleton {
    if (!MySingleton.instance) {
      MySingleton.instance = new MySingleton()
    }
    return MySingleton.instance
  }
  public name = null

  constructor() {
    this.setInitialName()
  }

  // It´s still possible to do no reactive changes
  private setInitialName() {
    this.name = 'old name'
  }

  public updateData() {
    useWatcher((done) => {
      this.name = 'new name'
      done()
    })
  }
}
/* some singleton class */
setValue(MySingleton)
```

Using the `SingletonProvider` in the index file.

**index.tsx**

```tsx
import * as React from 'react'
import { render } from 'react-dom'
import { SingletonProvider } from 'reactive-singleton'
import MyApp from './MyApp'

const rootElement = document.getElementById('root')
render(
  <SingletonProvider>
    <MyApp />
  </SingletonProvider>,
  rootElement
)
```

Inside the MyApp component, you can use your singleton service (implemented previously) as usual.

**MyApp.tsx**

```tsx
import React, { useEffect } from 'react'
import { useSingletonStatus, useWasDataUpdated } from 'reactive-singleton'
import MySingleton from '...'

const MyApp = () => {
  // Will return "ready" before useEffect block
  // Will return "in_progress" after useEffect block
  // Will return "ready" after the data be updated inside the singleton instance
  const status = useSingletonStatus(MySingleton) === 'ready'
  // Will return 'false' before useEffect block
  // Will return 'true' after useEffect block
  const wasDataUpdated = useWasDataUpdated(MySingleton)

  const singletonData = MySingleton.getInstance()

  // Will be 'old name' before useEffect block
  // Will be 'new name' after useEffect block and data be updated inside the singleton instance
  const { name } = singletonData

  useEffect(() => {
    singletonData.updateData()
  }, [])

  return (
    <>
      <span>Data updated? {wasDataUpdated ? 'Yes' : 'No'}</span>
      {status ? <p> Username: {name} </p> : <p>Loading...</p>}
    </>
  )
}

export default MyApp
```

That's basically this. Feel free to check out the live demos for a better understanding.

## :eyes: Live Demos

- Using Typescript: [TypeScript Example - CodeSandBox](https://codesandbox.io/s/reactive-singleton-typescript-ibfu3)

- Using Javascript (ES6): [JavaScript Example - CodeSandBox](https://codesandbox.io/s/reactive-singleton-javascript-39mmq)

## :stop_sign: Limitations

The only limitation here is, **SINGLETON`S METHODS CAN NOT BE DESTRUCTURED**. So, use them like:

```ts
  const singletonData = MySingleton.getInstance()
  // (!) Methods can't be destructured
  singletonData.updateData()
}
```

## :notebook: Changelogs

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
