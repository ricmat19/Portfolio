import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./routes/home";
import AdminLogin from "./routes/admin/login";
import AdminHome from "./routes/admin/home";

const App = () => {
  return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/" component={AdminHome} />
        </Router>
      </div>
  );
};

export default App;
