import { Servise } from "../page/home/Home"

interface Props {
    servisec: Servise[]
}
function Servisec({servisec}: Props) {

  return (
    <section id="servisec" className="servisec">
        <div className="text-center">
            <h1>Our Services</h1>
            <p>Creative & Proffesional Creative Agency!</p>
        </div>
        <div className="servisec-cards">
            {
                servisec.map(servise => <div className="servisec-card">
                    <img src={servise.imgUrl} alt="#" />
                    <h2>{servise.name}</h2>
                    <p>{servise.description}</p>
                </div>)
            }
        </div>
    </section>
  )
}

export default Servisec