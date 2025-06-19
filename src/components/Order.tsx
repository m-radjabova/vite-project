import telefon from '../assets/image 28.svg';
import select from '../assets/Group 91.svg';
import addToCart from '../assets/add-to-cart 1.svg';
import order1 from '../assets/Group (4).svg';

import google from '../assets/en_badge_web_generic-removebg-preview 1.svg';
import appstore from '../assets/logo-app-store-brand-font-png-favpng-Gb5FcTZcrb9bRikX49s26mMVn-removebg-preview 1 (1).svg'
function Order() {
  return (
    <div className='order'>
        <div className="order-item1">
            <img className='telefon' src={telefon} alt="" />
        </div>
        <div className="order-info">
            <h1>Simple Way To Order Your Food</h1>
            <p>Some food has looked so awful that it's looked like something that 
                the <br /> dog's brought home, yet after one mouthful I've been left eating my <br /> thoughts.
            </p>
            <div className='orders'>
                <div className='order-item2'>
                    <img src={select} alt="" />
                    <h5>Select Your Food</h5>
                </div>
                <div className='order-item2'>
                    <img src={addToCart} alt="" />
                    <h5>Add To Cart</h5>
                </div>
                <div className='order-item2'>
                    <img src={order1} alt="" />
                    <h5>Order Your Food</h5>
                </div>
            </div>
            <div className='download'>
                <img src={google} alt="" />
                <img src={appstore} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Order;