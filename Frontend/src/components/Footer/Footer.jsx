import { assets } from "../../assets/assets";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
            consequuntur culpa temporibus commodi ipsa! Molestias ipsum est
            mollitia consequatur quas quis totam. Dolor!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twiiter" />
            <img src={assets.linkedin_icon} alt="linked" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Companys</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+92 4389843289</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @tomato.com - All Right Reserved
      </p>
    </div>
  );
};

// rafce

export default Footer;
