import React, { useState, useRef } from "react";
import IndexAPI from "../apis/indexAPI";

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
      <div className="align-content-center">
        <div className="center">
          <p className="title">contact</p>
        </div>
        <div className="form-div">
          <form className="contact-form" method="POST" action="/contact">
            <div className="grid subject-line">
              <input
                type="text"
                ref={nameInput}
                onChange={(e) => setName(e.target.value)}
                name="name"
                placeholder="Name:"
              />
            </div>
            <div className="grid subject-line">
              <input
                type="email"
                ref={emailInput}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email:"
                required
              />
            </div>
            <div className="grid subject-line">
              <input
                type="text"
                ref={subjectInput}
                onChange={(e) => setSubject(e.target.value)}
                name="subject"
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
            <div className="center">
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
    </div>
  );
};

export default ContactC;
