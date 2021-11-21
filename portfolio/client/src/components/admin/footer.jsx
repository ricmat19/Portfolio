import React from "react";

const AdminFooterC = () => {
  return (
    <div className="grid footer">
      <div>Ricardo Del Cueto</div>
      <div className="grid admin-footer-nav">
        <a className="nav-link" href="/admin">
          <p>home</p>
        </a>
        <a className="nav-link" href="/admin/about">
          <p>about</p>
        </a>
        <a className="nav-link" href="/admin/portfolio">
          <p>portfolio</p>
        </a>
      </div>
    </div>
  );
};

export default AdminFooterC;
