import React from "react";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "./Router";
import routerConfig from "./config";
import App from "../Component";

const MainPage = () => {
  return (
    <App>
      <Switch>
        {routerConfig.map((route) => (
          <RouteWithSubRoutes key={route.path} {...route} />
        ))}
      </Switch>
    </App>
  );
};

export default MainPage;
