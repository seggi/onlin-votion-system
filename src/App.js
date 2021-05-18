import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import './App.css';
import './components/style/entry/signup_signin.css';
import LoginPage from "./components/authpage/Loginpage";
import SignupPage from "./components/authpage/Signupage";
import MainPage from "./components/mainpage/Mainpage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/main_page/dashboard" component={ MainPage} />
      </Switch>
    </Router>    
  );
}

export default App;
