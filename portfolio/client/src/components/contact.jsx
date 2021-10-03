import React, {useState, useRef} from 'react';
import IndexAPI from "../apis/indexAPI";
import HeaderC from './header';
import FooterC from './footer';

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
        e.preventDefault()
        try{
            const response = await IndexAPI.post("/contact", {
                name: name,
                email: email,
                subject: subject,
                message: message
            })

            nameInput.current.value = "";
            emailInput.current.value = "";
            subjectInput.current.value = "";
            messageInput.current.value = "";
             
        }catch(err){
            console.log(err);
        }

    }

    return(
        <div className="main">
            <HeaderC/>
            <div className="container">
                <div className="title-div">
                    <p className="title">contact</p>
                </div>
                <div className="form-div">
                    <form className="contact-form" method="POST" action="/contact">
                        <div className="subject-line">
                            <label className="form-label">name</label>
                            <input type="text" ref={nameInput} onChange={e => setName(e.target.value)} name="name" className="form-control"/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">email</label>
                            <input type="email" ref={emailInput} onChange={e => setEmail(e.target.value)} name="email" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">subject</label>
                            <input type="text" ref={subjectInput} onChange={e => setSubject(e.target.value)} name="subject" className="form-control" required/>
                        </div>
                        <div className="subject-line">
                            <label className="form-label">message</label>
                            <textarea name="message" ref={messageInput} onChange={e => setMessage(e.target.value)} rows="10" required></textarea>
                        </div>
                        <div className="">
                            <button onClick={handleSubmit} type="submit" className="">submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterC/>
        </div>
    )
}

export default ContactC;