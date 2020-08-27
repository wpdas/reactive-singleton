import React from 'react'
import Theme from '../theme'

interface ButtonProps {
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const { themeProps: theme } = Theme.getInstance()
  return (
    <button
      type="button"
      style={{
        background: theme.primaryColor,
        color: theme.secondaryColor,
        padding: '1rem',
        borderRadius: '8px',
        border: 'none',
        margin: '8px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
