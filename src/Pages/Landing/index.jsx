import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import "firebase/auth";
import style from "./index.module.scss";
import { ReactComponent as Student } from "./student.svg";
import { ReactComponent as Teacher } from "./teacher.svg";
import { useHistory } from "react-router-dom";
import UserRole, {ROLE} from "../../js/user-role";

export default function Landing() {
  const [user] = useAuthState(firebase.auth());
  const history = useHistory();

  useEffect(() => {
    UserRole.onRoleChange((role) => {
      console.log(`Role is ${role}. So could be redirected accordingly`)
      if (role === ROLE.STUDENT) {
        history.push("/student");
      }

      if (role === ROLE.TEACHER) {
        history.push("/teacher");
      }

      if (role === ROLE.ADMIN) {
        history.push("/admin");
      }

      if (role === ROLE.ACQUAINTANCE) {
        history.push(`/acquaintance`);
      }
    });
  }, [history]);

  return (
    <section className={style.landing}>
      <h1>
        Dear <code> {user?.displayName},</code>
      </h1>
      <h2>
        Let's start with
        <code> who are you?</code>
      </h2>

      <div>
        <button
          className={style.student}
          onClick={async () => {
            await UserRole.createRole(ROLE.STUDENT);
            history.push("/student");
          }}
        >
          <Student />
          Student
        </button>

        <button
          className={style.teacher}
          onClick={async () => {
            await UserRole.createRole(ROLE.TEACHER);
            history.push("/teacher");
          }}
        >
          <Teacher />
          Teacher
        </button>
      </div>
    </section>
  );
}
