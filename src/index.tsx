import { createRoot } from "react-dom/client"
import App from "./App"
import store from "./app/store"
import { Provider } from "react-redux"
import { GlobalStyle } from "styles/globalStyle"
import * as serviceWorker from "./serviceWorker"
import "./index.css"

const rootElem = document.getElementById("root")

const root = createRoot(rootElem!)

root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
