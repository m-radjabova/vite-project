import Logo from '../assets/images-removebg-preview 1.svg';
import facebook from '../assets/facebook 1.svg';
import instagram from '../assets/instagram 1.svg';
import twitter from '../assets/twitter 1.svg';
import linkedin from '../assets/linkedin 1.svg';
import chidir from '../assets/Group 118.svg';
import mastercard from '../assets/Group 117.svg';
import viza from '../assets/Group (5).svg';

function Footer() {
  return (
    <div className='footer container' id='contact'>
        <div className='footer-1'>
            <img src={Logo} alt="Logo" />
            <p>Some food has looked so awful that <br /> it's looked like something that the <br /> dog's brought home.</p>
            <div className='footer-1-icons'>
                <h4>Follow us:</h4>
                <div className='footer-1-icons-img'>
                    <img src={facebook} alt="Facebook" />
                    <img src={instagram} alt="Instagram" />
                    <img src={twitter} alt="Twitter" />
                    <img src={linkedin} alt="LinkedIn" />
                </div>
            </div>
        </div>
        <div className='footer-2'>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#product">Product</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact Us</a></li>
            </ul>
        </div>
        <div className='footer-3'>
            <ul>
                <li><a href="#">Delivery Information</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Search Terms</a></li>
                <li><a href="#">Order & Return</a></li>
            </ul>
        </div>
        <div className='footer-4'>
            <h3>Newsletter</h3>
            <div className="inp-email">
                <input type="email" placeholder='Your Email' />
                <button>Subscribe</button>
            </div>
            <div className='footer-4-icons'>
                <img src={chidir} alt="Chidir" />
                <img src={mastercard} alt="Mastercard" />
                <img src={viza} alt="Viza" />
            </div>
        </div>
    </div>
  )
}

export default Footer