import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Expenses from "./components/Expenses/Expenses";
import Navbar from "./components/Navbar/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { getExpenseDataAction } from "./components/Slices/asyncExpenseReducer";
import { getUserDataAction } from "./components/Slices/asyncUserReducer";
import store from "./components/Store/store";
import MyAccount from "./components/User/MyAccount";
import PassReset from "./components/User/PassReset";
import SignIn from "./components/User/SignIn";
import SignUp from "./components/User/SignUp";
import UpdateProfile from "./components/User/UpdateProfile";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/Navbar/Footer";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const dispatch = useDispatch();
  const changed = useSelector((state) => state.expenses.changed);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserDataAction());
    } else {
      return;
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (changed || isLoggedIn) {
      let localId = localStorage.getItem("localId");
      dispatch(getExpenseDataAction(localId));
    } else {
      return;
    }
  }, [changed, isLoggedIn, dispatch]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <Welcome />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="signUp"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <SignUp />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="signIn"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <SignIn />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="updateProfile"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <UpdateProfile />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="myAccount"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <MyAccount />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="passReset"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <PassReset />
                <Footer />
              </div>
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="expenses"
            element={
              <div>
                <Navbar
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <Expenses
                  check={darkMode}
                  change={() => setDarkMode(!darkMode)}
                />
                <div>
                  <Footer />
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
