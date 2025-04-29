import { Service } from "../page/home/Home"

interface Props {
    services: Service[]
    translations: {
        [key: string]: {
          [key: string]: string;
        };
      };
    currentLanguage: string; 
}
function Servisec({services, translations, currentLanguage}: Props) {

    const t = (key: string) => {
        return translations[currentLanguage]?.[key] || key;
    };

  return (
    <section id="services" className="servisec">
        <div className="text-center">
            <h1>{t('Our Services')}</h1> 
            <p>{t('Creative & Proffesional Creative Agency!')}</p> 
        </div>
        <div className="servisec-cards">
            {
                services.map(service => <div className="servisec-card"  data-aos="zoom-in">
                    <img src={service.imgUrl} alt="#" />
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                </div>)
            }
        </div>
    </section>
  )
}

export default Servisec