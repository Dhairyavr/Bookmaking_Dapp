import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
