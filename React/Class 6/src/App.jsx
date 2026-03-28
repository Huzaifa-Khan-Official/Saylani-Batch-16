import { Provider } from "react-redux"
import CounterProvider from "./context/CounterProvider"
import { UserProvider } from "./context/UserContext"
import Router from "./router/Router"
import { store } from "./store/store"

function App() {
  return (
    <CounterProvider>
      <UserProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </UserProvider>
    </CounterProvider>
  )
}

export default App