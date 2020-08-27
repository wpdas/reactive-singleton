import { createSingleton } from 'reactive-singleton'
const { watch, setClass } = createSingleton()

type StyleProps = {
  readonly primaryColor: string
  readonly secondaryColor: string
  readonly background: string
}

export type Themes = 'light' | 'dark'

export type ThemeProps = {
  readonly themeProps: StyleProps
  readonly activatedTheme: Themes
}

class Theme implements ThemeProps {
  private static instance: Theme
  public static getInstance(): Theme {
    if (!Theme.instance) {
      Theme.instance = new Theme()
    }
    return Theme.instance
  }

  private light: StyleProps = {
    primaryColor: '#BB86FC',
    secondaryColor: '#000000',
    background: '#FFFFFF',
  }
  private dark: StyleProps = {
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    background: '#3C4350',
  }

  public activatedTheme: Themes = 'light'
  public themeProps: StyleProps = this.light

  /**
   * Set the theme
   * @param themeType
   */
  public setTheme(themeType: Themes) {
    watch((done) => {
      this.activatedTheme = themeType
      this.themeProps = themeType === 'light' ? this.light : this.dark
      done()
    })
  }

  /**
   * Switch theme
   */
  public switchTheme() {
    if (this.activatedTheme === 'dark') {
      this.setTheme('light')
    } else if (this.activatedTheme === 'light') {
      this.setTheme('dark')
    }
  }
}

setClass(Theme)

export default Theme
