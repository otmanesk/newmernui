import * as React from "react";
import "./App.css";
import AppNavBar from "./navigation/App.Bar";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/Store";
// import blue from "@material-ui/core/colors/grey";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
// import { pink } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#484848",
      main: "#333333",
      dark: "#907D4C",
      contrastText: "#FAFAFA"
    },
    secondary: {
      light: "#484848",
      main: "#907D4C",
      dark: "#000000",
      contrastText: "#FAFAFA"
    }
  }
});
class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <AppNavBar />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
