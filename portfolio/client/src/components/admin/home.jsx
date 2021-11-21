import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import AdminHeaderC from "./header";
import AdminFooterC from "./footer";
import IndexAPI from "../../apis/indexAPI";

const HomeC = () => {
  const [loginStatus, setLoginStatus] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (loginStatus) {
    return (
      <div className="main">
        <AdminHeaderC />
        <div className="home-page-div"></div>
        <AdminFooterC />
      </div>
    );
  } else {
    return <Redirect to="/admin/login" />;
  }
};

export default HomeC;
