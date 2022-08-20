import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import CreateDeck from "./Layout/CreateDeck";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route path="/">
          <Layout />
          <CreateDeck />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
