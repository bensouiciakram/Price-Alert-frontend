import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center sm:footer-horizontal bg-white border-t border-gray-200 text-base-content px-4 sm:px-6 lg:px-8 py-6 mt-12">
      <aside className="text-sm sm:text-base text-gray-600">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Price Alert</span>. All rights
          reserved.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
