import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "redux/store";
import ThemeContext from "./context/ThemeContext";
import AppProvider from "./context/AppContext";
import { PersistGate } from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import "react-quill/dist/quill.snow.css";
import "assets/index.css"
const onBeforeLift = () => {
  // take some action before the gate lifts
};

let persistor = persistStore(store);

render(
  <Provider store={store}>
    <ThemeContext>
      <AppProvider>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </AppProvider>
    </ThemeContext>
  </Provider>,
  document.getElementById("root")
);
