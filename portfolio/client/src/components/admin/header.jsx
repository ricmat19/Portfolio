import React from "react";

const AdminHeaderC = () => {
  return (
    <div className="header">
        <nav className="admin-navbar">
            <a className="nav-link" href="/admin">
            <p>home</p>
            </a>
            <a className="nav-link" href="/admin/about">
            <p>about</p>
            </a>
            <a className="nav-link" href="/admin/portfolio">
            <p>portfolio</p>
            </a>
        </nav>
    </div> 
  );
};

export default AdminHeaderC;
