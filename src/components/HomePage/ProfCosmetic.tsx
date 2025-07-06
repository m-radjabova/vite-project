import daybyday from "../../assets/day_by_day_gamma_new 1.svg"
function ProfCosmetic() {
  return (
    <div className="prof-cosmetic">
        <div>
            <h1>Профессиональная 
                косметика
            </h1>
        </div>
        <div>
            <p>Мы являемся представителя  нескольких брендов профессиональной косметики для 
                салонов красоты на территории РФ.  Наша линейка брендов регулярно расширяется  
                и мы улучшаем логистику для того чтобы сделать доступной косметику в любой части России.
                </p>
            <p>
                Среди наших брендов: Greenlight, Brazzcare, Thats’so,
                Ellipse, SO UP RELOADED, Ameia, Biogenie Face and Buste,
                Venusian CO2, Plasmage, Skin Master Plus.
            </p>
            <p>
                Приглашаем к сотрудничеству салоны красоты и магазины профессиональной косметики.
            </p>
        </div>
        <div>
            <img src={daybyday} alt="" />
        </div>
    </div>
  )
}

export default ProfCosmetic