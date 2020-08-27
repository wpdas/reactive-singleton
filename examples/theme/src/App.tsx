import React from 'react'
import { withSingleton } from 'reactive-singleton'
import Theme from './theme'
import Container from './components/container'
import Header from './components/header'
import Button from './components/button'

const App = () => {
  // can be used as well in order to re-render when theme is updated
  // useReRenderOnUpdate(Theme)

  // Theme Singleton
  const theme = Theme.getInstance()
  const { activatedTheme } = theme

  const switchTheme = () => {
    theme.switchTheme()
  }

  return (
    <Container>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {activatedTheme === 'dark' && (
          <Button onClick={switchTheme}>Activate Light Theme</Button>
        )}
        {activatedTheme === 'light' && (
          <Button onClick={switchTheme}>Activate Dark Theme</Button>
        )}
      </div>
    </Container>
  )
}

export default withSingleton(App, Theme)
