import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

export default function RouteWithSubRoutes (route) {
  
  const history = useHistory();
  const [user, loading] = useAuthState(firebase.auth());
  
  useEffect(() => {
    const isProtectedRouter = route.protected !== false; // route.protected default is true
    console.log(
      `user: ${user} isProtectedRouter: ${isProtectedRouter} loading: ${loading}`
    );
    if (!loading && !user && isProtectedRouter) {
      history.push("/");
    }
  }, [loading, user, route.protected, history])
  
  
  return (
    <>
      <Route path={route.path} key={route.path} exact>
        <route.component {...route} />
      </Route>
      {route?.subRoutes?.map((subRoute) => (
        <RouteWithSubRoutes key={subRoute.path} {...subRoute} />
      ))}
    </>
  );
}
