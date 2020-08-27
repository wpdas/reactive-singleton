import React from 'react'
import Theme from '../theme'

const Header: React.FC = () => {
  const { themeProps: theme } = Theme.getInstance()

  return (
    <header style={{ background: theme.primaryColor, width: '100%' }}>
      <h3 style={{ color: theme.secondaryColor, textAlign: 'center' }}>
        My Awesome Title
      </h3>
    </header>
  )
}

export default Header
