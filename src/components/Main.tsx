import circle from '../assets/Ellipse 18.svg';
import cream from '../assets/UaNIa1ewNn-removebg-preview 1.svg';
import IceCream from '../assets/eep88j2SDJ-removebg-preview 1.svg';
// import soya from '../assets/Ellipse 19.svg';
function Main() {
  return (
    <div className='container'>
      <div className="main">
        <div className="left-content">
          <p>Sweet fun, full of milk.</p>
          <h1>
            Feel inside cold with<br />
            our delicious <span className="highlight">ice-cream.</span>
          </h1>
          <h4>
            Some food has looked so awful that it's looked like something that <br /> the dog's brought home, 
            yet after one mouthful I've been left <br /> eating my thoughts, my words.
          </h4>
          <button>Buy Now</button>
        </div>
        <div className="right-content">
          <img src={circle} alt="" className="circle" />
          <img src={cream} alt="" className="cream" />
          <img src={IceCream} alt="" className="icecream" />
          {/* <img src={soya} alt="" className="soya" /> */}
        </div>
      </div>
    </div>
  )
}

export default Main