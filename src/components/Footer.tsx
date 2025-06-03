import FooterLogo from '../assets/logo (2).svg'
import phoneLogo from '../assets/Call.svg'
import vk from '../assets/entypo-social_vk-with-circle.svg'
import tg from '../assets/bi_telegram.svg'
function Footer() {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer-logo" style={{}}>
                <img src={FooterLogo} alt="#" style={{width: "300px", height: "auto", marginBottom: "60px"}} />
                <ul style={{ listStyle: "none" , textAlign: "left"}}>
                    <li>© YouMeal, 2022</li>
                </ul>
            </div>
            <div className='footer-content'>
              <div className='phone'>
                <h4>Номер для заказа</h4>
                <div className='phone-number d-flex align-items-center '>
                  <img src={phoneLogo} alt="phone" style={{marginRight: "10px"}} />
                  <span>+7(930)833-38-11</span>
                </div>
              </div>
              <div className='socials'>
                <h4>Мы в соцсетях</h4>
                <div className='socials-icons '>
                  <img src={vk} alt="VK" style={{marginRight: "10px", cursor: "pointer"}} />
                  <img src={tg} alt="Telegram" style={{cursor: "pointer"}} />
                </div>
              </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer