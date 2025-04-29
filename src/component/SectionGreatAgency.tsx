import LeftImg from "../assets/Group (1).svg"

interface Props {
    translations: {
        [key: string]: {
          [key: string]: string;
        };
      };
    currentLanguage: string;   
}

function SectionGreatAgency( {translations, currentLanguage} : Props) {

    const t = (key: string) => {
        return translations[currentLanguage]?.[key] || key;
    };
  return (
    <section className="section-great-agency" id="about">
        <div className="left-side" data-aos="fade-up-right">
            <img src={LeftImg} alt="#" />
        </div>
        <div className="right-side" data-aos="fade-up-left">
            <h1>
                {t('Great Creative Agency Since 1993')}
            </h1>
            <span>{t('Creative & Proffesional Creative Agency!')}</span>
            <p>{t('It is a long established fact that a reader will be distracted the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.')}
            </p>
        </div>
    </section>
  )
}

export default SectionGreatAgency