import { GlobalStyle } from "components"
import ThemeProvider from "components/context/themeContext"
import { BrowserRouter } from "react-router-dom"
import { Provider as ReduxProvider } from 'react-redux'
import store from 'state'
import ModalProvider from "components/Modal/ModalContext"

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