import usePartners from "../hooks/usePartners";


function PartnersPage() {
    const {partner} = usePartners();
  return (
    <div className="partnersPage">
        <div className="container">
            <div className="parfume-title m-5">
                <h1>Партнеры</h1>
            </div>
            <div className="parfume-list mb-3">
                {partner.map((partn, idx) => (
                    <div className="parfume-logo" key={idx}  >
                        <img src={partn.brandLogo} alt="#" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default PartnersPage