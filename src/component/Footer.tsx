import Logo from "../assets/Agency (1).svg"
import { FaPinterestP } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

interface Props {
  translations: {
    [key: string]: {
      [key: string]: string;
    };
  };
  currentLanguage: string;
}
function Footer( {translations, currentLanguage}: Props) {
  const t = (key: string) => {
    return translations[currentLanguage]?.[key] || key;
  };
  return (
    <footer className="footer" id="contact">
      <div className="footer__container" >
        <div className="footer__column">
          <img src={Logo} alt="#" />
          <p>
            {t('Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature.')}
          </p>
        </div>
        <div className="footer__column">
          <h4>{t('About')}</h4>
          <ul>
            <li>{t('About Us')}</li>
            <li>{t('Features')}</li> 
            <li>{t('News')}</li>
            <li>{t('Careers')}</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>{t('Company')}</h4>
          <ul>
            <li>{t('Our Team')}</li>
            <li>{t('Partner With Us')}</li>
            <li>{t('FAQ')}</li>
            <li>{t('Blog')}</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>{t('Support')}</h4>
          <ul>
            <li>{t('Account')}</li>
            <li>{t('Support Center')}</li>
            <li>{t('Feedback')}</li>
            <li>{t('Contact Us')}</li>
          </ul>
        </div>
        <div className="footer__column">
          <h4>{t('Get In Touch')}</h4>
          <p>{t("Have a question or feedback? We'd love to hear from you.")}</p>
          <div className="footer__social-icons">
            <span className="icon"> <FaPinterestP /></span>
            <span className="icon"> <FaInstagram /></span>
            <span className="icon"> <FaFacebookF /></span>
            <span className="icon"> <FaYoutube /></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;