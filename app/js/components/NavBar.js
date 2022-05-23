import * as React from "react";
import {Link, useMatch, useResolvedPath} from "react-router-dom";
//import type {LinkProps} from "react-router-dom";

function CustomLink({children, to, ...props}) {
  let resolved = useResolvedPath(to);
  let match = useMatch({path: resolved.pathname, end: true});

  return (
    <Link
      style={{textDecoration: match ? "underline" : "none"}}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

function NavBar() {
  return (
    <div>
      <div>
        <Link to="/userDashboard">User Access</Link>
        <nav
          style={{
            borderBottom: "solid 2px",
            paddingBottom: "1rem",
            background: "wheat",
            marginBottom: "10px"
          }}
        >
          <CustomLink to="/hrTeamsDashboard">Main</CustomLink> |{" "}
          <CustomLink to="/hrCompletedDashboard">Completed</CustomLink> |{" "}
          <CustomLink to="/hrTeamDashboard/1">Team 1</CustomLink> |{" "}
          <CustomLink to="/hrTeamDashboard/2">Team 2</CustomLink> |{" "}
          <CustomLink to="/hrTeamDashboard/3">Team 3</CustomLink> |{" "}
          <CustomLink to="/hrTeamDashboard/4">Team 4</CustomLink>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
