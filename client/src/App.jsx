import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Form from "./pages/Form";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <div className={isDark ? `dark` : ``}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signin"
            render={(props) =>
              !currentUser ? (
                <SignIn {...props} isDark={isDark} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/signup"
            render={(props) =>
              !currentUser ? (
                <SignUp {...props} isDark={isDark} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            render={(props) =>
              currentUser ? (
                <Dashboard {...props} isDark={isDark} />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route
            exact
            path="/forgot-password"
            render={(props) => <ForgotPassword {...props} isDark={isDark} />}
          />
          <Route
            exact
            path="/reset-password"
            render={(props) => <ResetPassword {...props} isDark={isDark} />}
          />
          <Route
            exact
            path="/form/:id"
            render={(props) => <Form {...props} isDark={isDark} />}
          />
        </Switch>
      </div>
    </>
  );
}

export default App;
