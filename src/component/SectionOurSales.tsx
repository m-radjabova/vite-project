import RightImg from "../assets/image 32.svg"

interface Props {
  translations: {
      [key: string]: {
        [key: string]: string;
      };
    };
  currentLanguage: string;   
}

function SectionOurSales( {translations, currentLanguage} : Props) {

  const t = (key: string) => {
      return translations[currentLanguage]?.[key] || key;
  };
  return (
    <section className="section-our-sales">
        <div className="left-side" data-aos="fade-up-right">
          <h1> {t('Our Speciality Sales Increase By 250%')} </h1>
          <ul>
              <li><input type="checkbox" checked/> {t('There Are Many Variations Of Passages Of Lorem Ipsum.')} </li>
              <li><input type="checkbox" checked/> {t('Available, But The Majority Have Suffered Alteration In  Some Form, By Injected Humour.')}</li>
              <li><input type="checkbox" checked/> {t("Randomised Words Which Don't Look Even Slightly  Believable.")}</li>
              <li><input type="checkbox" checked/> {t('If You Are Going To Use A Passage Of Lorem Ipsum.')}</li>
              <li><input type="checkbox" checked/> {t("Need To Be Sure There Isn't Anything Embarrassing  Hidden In The Middle Of Text.")}</li>
          </ul>
        </div>
        <div className="right-side" data-aos="fade-up-left">
          <img src={RightImg} alt="#" />
        </div>
    </section>
  )
}

export default SectionOurSales