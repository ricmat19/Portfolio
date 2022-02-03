import React from "react";

const AboutC = () => {
  return (
    <div className="main grid">
      <div className="container about-container">
        <div className="title-div">
          <p className="title">about</p>
        </div>
        <div className="about-content-div">
          <div className="profile-image-div">
            <img className="profile-image" src="../images/about-image.jpg" />
          </div>
          <div className="info-div">
            <div className="info-text-div">
              <p>
                <strong>
                  Hi! My name is Ricardo &quot;Ricky&quot; Del Cueto.
                </strong>{" "}
                A Full Stack Web Developer living in Miami, Florida. Throughout
                my journey in web development I&apos;ve developed a strong
                understanding of various technologies including: JavaScript,
                React, Node.js, Express, MySQL, PostgreSQL, HTML5, and CSS3. I
                got into web development because I love the process of creating
                something new as well as solving puzzle. Web development
                provides me with an opportunity to do both of these things. On
                top of that software development is constantly changing and
                evolving, providing me with the exiting opportunity to
                continusly learn and develop new skills as a developer.
              </p>
              <p>
                Want help with your web development project? Feel free to
                contact me. I&apos;d love to connect and hopefully help you
                build something great!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutC;