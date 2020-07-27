import React from 'react'
import { render } from '@testing-library/react'
import { SingletonProvider } from '../../lib'

const TestApp = () => (
  <SingletonProvider>
    <p data-testid="message-test">I&apos;m working with singleton provider!</p>
  </SingletonProvider>
)

test('Renders component using the Singleton Provider', () => {
  const { getByTestId } = render(<TestApp />)
  expect(getByTestId('message-test').textContent).toBe(
    "I'm working with singleton provider!"
  )
})
