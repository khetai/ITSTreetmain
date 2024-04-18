import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/Logo.jpg";
import "./index.scss";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="container">
      <div className="social">
        <Link to={"/"}>
          <img src={Logo} alt="navBrand" />
        </Link>
        <nav>
          <Link>
            <div>
              <BsInstagram />
            </div>
          </Link>
          <Link>
            <div>
              <FaFacebook />
            </div>
          </Link>
          <Link>
            <div>
              <i class="fa-solid fa-at"></i>
            </div>
          </Link>
        </nav>
      </div>
      <hr />
      <div className="copyright">
        <div>
          Copyright 2023 © <strong>ITSTREET.</strong>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
