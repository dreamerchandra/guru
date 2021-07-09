import React, { useEffect } from "react";
import style from "./index.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { googleLogin } from "../../js/firebase-auth";

export default function Home () {
  const [user] = useAuthState(firebase.auth());
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push("/landing");
    }
  }, [user, history]); 

  return (
    <section className={style.home}>
      <h2>We curate your</h2>
      <h1> Search </h1>
      <h2> before</h2>
      <h1> Exam </h1>

      <button onClick={googleLogin}>Let's Begin {">"}</button>
    </section>
  );
}
