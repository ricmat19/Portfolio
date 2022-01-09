import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./routes/home";
import AdminLogin from "./routes/admin/login";
import AdminHome from "./routes/admin/home";
import AdminProjects from "./routes/admin/projects";
import AdminProjectDetails from "./routes/admin/projectDetails";
import AdminAbout from "./routes/admin/about.jsx";

const App = () => {
  return (
      <div>
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/projects" component={AdminProjects} />
          <Route
            exact
            path="/admin/portfolio/:project"
            component={AdminProjectDetails}
          />
          <Route exact path="/admin/about" component={AdminAbout} />
        </Router>
      </div>
  );
};

export default App;
