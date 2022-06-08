import * as React from 'react';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

function CustomLink({children, to, ...props}) {
  let resolved = useResolvedPath(to);
  let match = useMatch({path: resolved.pathname, end: true});

  return (
    <Link
      style={{color: "white", textDecoration: match ? "underline" : "none"}}
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
        <nav
          style={{
            borderBottom: "solid 2px",
            paddingBottom: "1rem",
            background: "rgb(55, 107, 126)",
            color: "white",
            marginBottom: "10px",
            fontWeight: "bold",
            padding: "10px"
          }}
        >
          <CustomLink to="/pastWeeklyDashboard">Past Weekly</CustomLink> |{" "}
          <CustomLink to="/pastDailyDashboard">Past Daily</CustomLink> |{" "}
          <CustomLink to="/">Daily</CustomLink> |{" "}
          <CustomLink to="/weeklyDashboard">Weekly</CustomLink> |{" "}
          <CustomLink to="/monthlyDashboard">Monthly</CustomLink>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
