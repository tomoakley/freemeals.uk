import React from "react";
import { Switch } from "react-router-dom";

import Route from "./Route";

import List from "containers/list";
import Map from "containers/map";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={List} />
      <Route path="/map" exact component={Map} />
    </Switch>
  );
}
