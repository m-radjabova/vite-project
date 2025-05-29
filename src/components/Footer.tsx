import FooterLogo from '../assets/logo (2).svg'
function Footer() {
  return (
    <footer className="footer" style={{padding: "20px 0" }}>
        <div className="container">
            <div className="footer-logo" style={{}}>
                <img src={FooterLogo} alt="#" style={{width: "300px", height: "auto", marginBottom: "60px"}} />
                <ul style={{ listStyle: "none" , textAlign: "left"}}>
                    <li>© YouMeal, 2022</li>
                </ul>
            </div>
            <div className='footer-content'>
                
            </div>
        </div>
    </footer>
  )
}

export default Footer