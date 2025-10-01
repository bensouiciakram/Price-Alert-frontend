import React from "react";
import { CiMenuBurger } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-primary font-bold">
          Price Alert
        </a>
      </div>
      <div className="flex-none">
        <details className="dropdown">
          <summary className="btn m-1 md:hidden">
            <CiMenuBurger size={20} />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </details>
        <ul className="menu menu-horizontal px-1 max-md:hidden">
          <li>
            <a>Link</a>
          </li>
          <li>
            <a>Link</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
