import circle from '../assets/Ellipse 18.svg';
import cream from '../assets/UaNIa1ewNn-removebg-preview 1.svg';
import IceCream from '../assets/eep88j2SDJ-removebg-preview 1.svg';
function Main() {
  return (
    <div className="main">
        <div className="left-content">
            <span>Sweet fun, full of milk.</span>
            <h1>Feel inside cold with our delicious ice-cream.</h1>
            <p>Some food has looked so awful that it's looked like something that the dog's brought home, 
                yet after one mouthful I've been left eating my thoughts, my words.
            </p>
            <button>Buy now</button>
        </div>
        <div className="right-content">
            <img src={circle} alt="" className="circle" />
            <img src={cream} alt="" className="cream" />
            <img src={IceCream} alt="" className="icecream" />
        </div>
    </div>
  )
}

export default Main