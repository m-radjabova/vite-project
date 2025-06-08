import FooterLogo from '../assets/logo (2).svg'
import phoneLogo from '../assets/Call.svg'
import vk from '../assets/entypo-social_vk-with-circle.svg'
import tg from '../assets/bi_telegram.svg'
function Footer() {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-logo">
                <img style={{cursor: "pointer", width: "200px"}} src={FooterLogo} alt="#" />
                <ul style={{ listStyle: "none" , textAlign: "left", marginTop: "50px"}}>
                    <li>© YouMeal, 2022</li>
                </ul>
            </div>
            <div className='footer-content'>
              <div className='phone'>
                <h4>Номер для заказа</h4>
                <div className='phone-number d-flex align-items-center mt-3 '>
                  <img src={phoneLogo} alt="phone" style={{marginRight: "10px"}} />
                  <span>+7(930)833-38-11</span>
                </div>
              </div>
              <div className='socials'>
                <h4>Мы в соцсетях</h4>
                <div className='socials-icons mt-3 '>
                  <img src={vk} alt="VK" style={{cursor: "pointer"}} />
                  <img src={tg} alt="Telegram" style={{cursor: "pointer"}} />
                </div>
              </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer