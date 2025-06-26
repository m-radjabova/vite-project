import { useState } from "react";
import morojni from '../assets/Group 82.svg';
import FoodModal from "./FoodModal";

function Oatmea() {
  const [showModal, setShowModal] = useState(false);
  const foodData = {
    image: morojni,
    name: "Brown Sugar Oatmeal",
    description: "Delicious creamy oatmeal with a touch of brown sugar and vanilla. Perfect for a healthy breakfast that keeps you full for hours.",
    calories: "210",
    time: "5",
    ingredients: ["Oatmeal", "Brown sugar", "Milk", "Vanilla extract", "Cream", "Cinnamon", "Salt"],
    rating: 4.5,
  };

  return (
    <div className='oatmea container'>
      <div className='left-side' data-aos="zoom-in-right">
        <h1>Brown Sugar <br /> Oatmea</h1>
        <p>
          Together with McDonald’s, Burger King has grown to become <br />
          synonymous with burgers in the US.Together with McDonald’s, <br />
          Burger King has grown to become synonymous.
        </p>
        <button onClick={() => setShowModal(true)}>See Details</button>
      </div>
      <div className='right-side' data-aos="zoom-in-left">
        <img src={morojni} alt="#" />
      </div>
      <FoodModal
        show={showModal} 
        onClose={() => setShowModal(false)} 
        food={foodData}
      />
    </div>
  )
}

export default Oatmea;