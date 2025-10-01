import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";

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
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/products/alerts">Alerts</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/settings">Settings</Link>
            </li>
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </details>
        <ul className="menu menu-horizontal px-1 max-md:hidden">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/products/alerts">Alerts</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
          <li>
            <Link href="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
