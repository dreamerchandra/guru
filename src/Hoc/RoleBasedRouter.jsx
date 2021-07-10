import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserRole, { ROLE } from "../js/user-role";

export default function withRoleRouted(Component, expectedRole) {
  if (!Object.values(ROLE).includes(expectedRole))
    throw new Error(
      `expectedRole to be one of ${Object.values(ROLE)} Got ${expectedRole}`
    );
  
    
    return (props) => {
      const [userRole, setUserRole] = useState(ROLE.NA);
      const [loading, setLoading] = useState(true);
      const history = useHistory()
      
      useEffect(() => {
        UserRole.onRoleChange((role) => {
          setUserRole(role);
          setLoading(false);
        });
      }, [])
      
      if (loading) {
        return <p>Loading</p>
      }

      if (userRole === ROLE.NA ) {
        return null;
      }

  }
}
