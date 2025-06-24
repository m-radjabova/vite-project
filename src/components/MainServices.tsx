import shipping from '../assets/Group (2).svg';
import packaging from '../assets/Group (3).svg';
import money from '../assets/cash-back 1.svg';
import delivery from '../assets/fast-delivery 1.svg';

function MainServices() {
  return (
    <div className='services-box'>
        <div className='services-item' data-aos="zoom-in">
            <img src={shipping} alt="#" />
            <p>Free Shipping</p>
            <span>Last Chance! Free shipping on all orders ends today.</span>
        </div>
        <div className='services-item' data-aos="zoom-in">
            <img src={packaging} alt="#" />
            <p>Quick Packaging</p>
            <span>Last Chance! Free shipping on all orders ends today.</span>
        </div>
        <div className='services-item' data-aos="zoom-in">
            <img src={money} alt="#" />
            <p>100% Money Back</p>
            <span>Last Chance! Free shipping on all orders ends today.</span>
        </div>
        <div className='services-item' data-aos="zoom-in">
            <img src={delivery} alt="#" />
            <p>Fast Delivery</p>
            <span>Last Chance! Free shipping on all orders ends today.</span>
        </div>
    </div>
  )
}

export default MainServices