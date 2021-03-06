import React, {useState, useEffect} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignIn from "./pages/signinPage";
import SignUp from "./pages/signupPage";
import ContactPage from "./pages/contactPage";
import EventsPage from "./pages/EventsPage";
import IndividualContact from "./pages/indivContactPage";
import CreateContactPage from './pages/CreateContactPage';


function App() {
  const [userId, setUserId] = useState();
  useEffect(() => {
    console.log(userId);
  }, [userId])
  return (<Router>
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/contact-page" component={ContactPage} />
      <Route path="/individual-contact" component={IndividualContact} />
      <Route path="/events" component={EventsPage} />
      <Route path="/create-contact" component={CreateContactPage} />

      {/* navigation bar/ team ion logo */}
      {/* <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>ION</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>  */}
    </Switch>
  </Router>
  );
}

export default App;