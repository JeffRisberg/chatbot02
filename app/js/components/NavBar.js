import * as React from 'react';
import {Link, useMatch, useResolvedPath} from 'react-router-dom';

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
        <nav
          style={{
            borderBottom: "solid 2px",
            paddingBottom: "1rem",
            background: "yellow",
            marginBottom: "10px",
            fontWeight: "bold"
          }}
        >
          <CustomLink to="/">Daily</CustomLink> |{" "}
          <CustomLink to="/weeklyDashboard">Weekly</CustomLink> |{" "}
          <CustomLink to="/threeMonthDashboard">3 Months</CustomLink>
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
