interface Props {
  translations: {
    [key: string]: {
      [key: string]: string;
    };
  };
  currentLanguage: string; 
}
function SectionSubscribe( {translations, currentLanguage}: Props ) {

    const t = (key: string) => {
        return translations[currentLanguage]?.[key] || key;
    }
  return (
    <section className="section-subscribe">
        <div className="container" data-aos="fade-up"
     data-aos-anchor-placement="top-center">
            <div className="left-side">
                <h1> {t('Subscribe To Get The Latest')} <br />
                {t('News About Us')} </h1>
                <p>{t('Lorem Ipsum is not simply random text. It has roots in')}<br /> 
                {t('a piece of classical Latin literature.')}</p>
            </div>
            <div className="right-side">
                <input type="email" placeholder="Enter your email" />
                <button>{t('Send')}</button> 
            </div>
        </div>
    </section>
  )
}

export default SectionSubscribe