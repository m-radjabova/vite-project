import morojni from '../assets/Group 82.svg';

function Oatmea() {
  return (
    <div className='oatmea container'>
        <div className='left-side'>
            <h1>Brown Sugar <br /> Oatmea</h1>
            <p>Together with McDonald’s, Burger King has grown to become <br /> synonymous 
                with burgers in the US.Together with McDonald’s, <br /> Burger King has 
                grown to become synonymous.
            </p>
            <button>See Details</button>
        </div>
        <div className='right-side'>
            <img src={morojni} alt="#" />
        </div>
    </div>
  )
}

export default Oatmea