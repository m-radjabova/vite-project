
import RightImg from "../assets/image 32.svg"

function SectionOurSales() {
  return (
    <section className="section-our-sales">
        <div className="left-side">
          <h1> Our Speciality Sales <br />
            Increase By 250% </h1>
          <ul>
              <li><input type="checkbox" checked/> There Are Many Variations Of Passages Of Lorem <br /> Ipsum.</li>
              <li><input type="checkbox" checked/> Available, But The Majority Have Suffered Alteration In <br /> Some Form, By Injected Humour.</li>
              <li><input type="checkbox" checked/> Randomised Words Which Don't Look Even Slightly <br /> Believable.</li>
              <li><input type="checkbox" checked/> If You Are Going To Use A Passage Of Lorem Ipsum.</li>
              <li><input type="checkbox" checked/> Need To Be Sure There Isn't Anything Embarrassing <br /> Hidden In The Middle Of Text.</li>
          </ul>
        </div>
        <div className="right-side">
          <img src={RightImg} alt="#" />
        </div>
    </section>
  )
}

export default SectionOurSales