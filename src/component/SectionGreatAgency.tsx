import LeftImg from "../assets/Group (1).svg"

function SectionGreatAgency() {
  return (
    <section className="section-great-agency">
        <div className="left-side">
            <img src={LeftImg} alt="#" />
        </div>
        <div className="right-side">
            <h1>Great Creative Agency
                Since 1993
            </h1>
            <span>Creative & Proffesional Creative Agency!</span>
            <p>It is a long established fact that a reader will be distracted <br /> the 
                readable content of a page when looking at its layout. <br /> The point of using Lorem 
                Ipsum is that it has a more-or-less <br /> normal distribution of letters.
            </p>
        </div>
    </section>
  )
}

export default SectionGreatAgency