import CounterProvider from "./context/CounterProvider"
import { UserProvider } from "./context/UserContext"
import Router from "./router/Router"

function App() {
  return (
    <CounterProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </CounterProvider>
  )
}

export default App