import { useNavigate } from 'react-router-dom';
import circle from '../assets/Ellipse 18.svg';
import cream from '../assets/UaNIa1ewNn-removebg-preview 1.svg';
import IceCream from '../assets/eep88j2SDJ-removebg-preview 1.svg';
import useContextPro from '../hooks/useContextPro';

function Main() {
  const { state: { user } } = useContextPro();
  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className="main">
        <div className="left-content" data-aos="fade-right">
          <p>Sweet fun, full of milk.</p>
          <h1>
            Feel inside cold with<br />
            our delicious <span className="highlight">ice-cream.</span>
          </h1>
          <h4>
            Some food has looked so awful that it's looked like something that <br /> the dog's brought home, 
            yet after one mouthful I've been left <br /> eating my thoughts, my words.
          </h4>
          <button onClick={
          user ? () => navigate('/checkout-product') : () => navigate('/login')
        } >Buy Now</button>
        </div>
        <div className="right-content" data-aos="fade-left">
          <img src={circle} alt="" className="circle" />
          <img src={cream} alt="" className="cream" />
          <img src={IceCream} alt="" className="icecream" />
        </div>
      </div>
    </div>
  )
}

export default Main