import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import React from "react";
import "./scss/App.scss";
import Main from "../page/Main";
import { history } from "../redux/configureStore";
import Detail from "../page/Detail";

const App = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/:type/:id" exact component={Detail} />
      </Switch>
    </ConnectedRouter>
  );
};

export default App;
