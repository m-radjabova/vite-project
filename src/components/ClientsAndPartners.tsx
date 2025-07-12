import usePartners from "../hooks/usePartners";

function ClientsAndPartners() {
    const { partners } = usePartners();

  return (
    <div className="partners">
        <div className="container">
            <div className="partners-title">
                <h1>Наши клиенты и партнеры</h1>
            </div>
            <div className="partners-list">
                {partners.map(item => (
                    <div className="partners-item" key={item.id}>
                        <img src={item.imageLogo} alt="" />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ClientsAndPartners