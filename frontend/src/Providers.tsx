import { GlobalStyle } from "components"
import ModalProvider from "components/context/modalContext"
import ThemeProvider from "components/context/themeContext"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from 'react-redux'
import store from 'state'

const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ModalProvider>
            <GlobalStyle />
            {children}
          </ModalProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default Providers