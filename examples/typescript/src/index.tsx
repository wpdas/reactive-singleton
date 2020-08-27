import * as React from 'react'
import { render } from 'react-dom'
import { SingletonProvider } from 'reactive-singleton'

import App from './App'
import './styles.css'

const rootElement = document.getElementById('root')
render(
  <SingletonProvider>
    <App />
  </SingletonProvider>,
  rootElement
)
