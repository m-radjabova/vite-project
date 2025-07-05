import foto from "../assets/o 1.svg"
function Parfume() {
  return (
     <div className="prof-cosmetic">
        <div>
            <h1>Парфюмерия</h1>
        </div>
        <div>
            <p>
                Оригинальная нишевая парфюмерия известных брендов напрямую от производителей доступна 
                вам в России. Наши духи и ароматы 100% оригинальны, что можно проверить по кодам на каждом флаконе.
            </p>
            <p>
                Мы предлагаем вам более 40 брендов парфюмерии, среди которых: 
                BOIS, CIRA, ALTAIA, Fragonard, Rosendo Mateu, Olfattology, Robert Piguet, Eau D’Italie, LINARI, Nobile 1942, Guido Crepax Valentina, Simone Anderoli и другие.
            </p>
        </div>
        <div>
            <img src={foto} alt="" />
        </div>
    </div>
  )
}

export default Parfume