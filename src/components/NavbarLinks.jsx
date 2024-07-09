import React from "react";
import { Link } from "react-router-dom";
function NavbarLinks() {
  return (
    <>
      <li>
        <Link className="" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="" to="/recipe">
          Create recipe
        </Link>
      </li>
      <li>
        <Link className="" to="/charts">
          Charts
        </Link>
      </li>
    </>
  );
}

export default NavbarLinks;
