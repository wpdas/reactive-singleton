import React from 'react'
import Theme from '../theme'

const Container: React.FC = ({ children }) => {
  const { themeProps: theme } = Theme.getInstance()
  return <div style={{ background: theme.background }}>{children}</div>
}

export default Container
