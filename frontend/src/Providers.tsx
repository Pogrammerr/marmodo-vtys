import { GlobalStyle } from "components"
import ModalProvider from "components/context/modalContext"
import ThemeProvider from "components/context/themeContext"
import { BrowserRouter } from "react-router-dom"

const Providers = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModalProvider>
          <GlobalStyle />
          {children}
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Providers