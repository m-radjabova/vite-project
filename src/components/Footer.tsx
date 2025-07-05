import { FiPhone, FiMail, FiMapPin, FiInstagram } from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-col">
          <h4>Контакты компании</h4>
          <div className="footer-row">
            <FiPhone className="footer-icon" />
            <span>
              8 (495) 109-23-13 доб.103, 104, 105;<br />
              8 (925) 649-98-34
            </span>
          </div>
          <div className="footer-row">
            <FiMail className="footer-icon" />
            <span>
              zakaz@solingcompany.ru<br />
              parfummanager@linkparfum.ru
            </span>
          </div>
          <div className="footer-row">
            <FiMapPin className="footer-icon" />
            <span>
              Москва, ул. Павловская, дом 27 стр 3
            </span>
          </div>
          <div className="footer-row">
            <FiInstagram className="footer-icon" />
            <span>
              @amiea_russia, @broazcare_russia, @greenlight_russia, @solingparfums
            </span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Юридические данные</h4>
          <div className="footer-row">
            <span>ООО «Солинг»</span>
          </div>
          <div className="footer-row">
            <span>ИНН 6720275595<br />ОГРН 1166722000591</span>
          </div>
          <button className="footer-btn">Заказать звонок</button>
        </div>
      </div>
      <div className="footer-bottom">
        2022 &copy; all right reserved
      </div>
    </footer>
  );
}

export default Footer;