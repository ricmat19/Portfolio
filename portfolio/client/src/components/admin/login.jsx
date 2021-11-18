import React, { useRef, useState } from "react";
import {useHistory} from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";

const LoginC = () => {

    // const [loginStatus, setLoginStatus] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    let history = useHistory();
    history.push("/admin")

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          await IndexAPI.post("/login", {
            email: email,
            password: password,
          });
        } catch (err) {
          console.log(err);
        }
      };

    return (
        <div className="login-main">
            <div className="login-div title-div">
                <p className="login-header">login</p>
                <div className="login-inputs">
                    <div className="grid modal-input-div">
                    <input
                        type="email"
                        ref={emailInput}
                        value={email}
                        name="email"
                        placeholder="email"
                        onChange={(e) => {
                        setEmail(e.target.value);
                        }}
                    />
                    </div>
                    <div className="grid modal-input-div">
                    <input
                        type="password"
                        ref={passwordInput}
                        value={password}
                        name="password"
                        placeholder="password"
                        onChange={(e) => {
                        setPassword(e.target.value);
                        }}
                    />
                    </div>
                </div>
                <div className="form-button-div">
                    <button className="form-button" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default LoginC;
