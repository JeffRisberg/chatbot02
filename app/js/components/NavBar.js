import * as React from 'react';
// import {Link, useMatch, useResolvedPath} from 'react-router-dom';


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
          Past Weekly | {" "}
          Past Daily | {" "}
          Daily | {" "}
          Weekly
        </nav>
      </div>
    </div>
  );
}

export default NavBar;
