import React, { useState, useRef } from "react";
import IndexAPI from "../apis/indexAPI";
// import HeaderC from "./header";
// import FooterC from "./footer";

const ContactC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const subjectInput = useRef(null);
  const messageInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await IndexAPI.post("/contact", {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });

      nameInput.current.value = "";
      emailInput.current.value = "";
      subjectInput.current.value = "";
      messageInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main grid">
      {/* <HeaderC /> */}
      <div className="container contact-container">
        <div className="title-div">
          <p className="title">contact</p>
        </div>
        <div className="form-div">
          <form className="contact-form" method="POST" action="/contact">
            <div className="subject-line">
              <input
                type="text"
                ref={nameInput}
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="form-control"
                placeholder="Name:"
              />
            </div>
            <div className="subject-line">
              <input
                type="email"
                ref={emailInput}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="form-control"
                placeholder="Email:"
                required
              />
            </div>
            <div className="subject-line">
              <input
                type="text"
                ref={subjectInput}
                onChange={(e) => setSubject(e.target.value)}
                name="subject"
                className="form-control"
                placeholder="Subject:"
                required
              />
            </div>
            <div className="textarea-subject-line">
              <textarea
                name="message"
                ref={messageInput}
                onChange={(e) => setMessage(e.target.value)}
                rows="7"
                placeholder="Message:"
                required
              ></textarea>
            </div>
            <div className="form-button-div">
              <button
                className="contact-form-button"
                onClick={handleSubmit}
                type="submit"
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <FooterC /> */}
    </div>
  );
};

export default ContactC;
