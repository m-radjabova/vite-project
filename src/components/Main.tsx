import leftImg from '../assets/pic.svg';

function Main() {
  return (
    <main className='main'>
        <div className='container'>
            <div className='left-side'>
                    <img src={leftImg} alt="left-side" />
            </div>
            <div className='right-side'>
                    <h1>
                        Только самые <br />
                        <span style={{ color: "#FF7020" }}>сочные бургеры!</span>
                    </h1>
                    <p>Бесплатная доставка от 599₽</p>
            </div>
        </div>
    </main>
  )
}

export default Main