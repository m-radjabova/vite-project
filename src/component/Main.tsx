import { FaPlayCircle } from "react-icons/fa";
import RightImg from "../assets/Group.svg"

interface MainProps{
    translations: {
        [key: string]: {
          [key: string]: string;
        };
      };
    currentLanguage: string;
}
function Main({translations, currentLanguage} : MainProps) {
    const t = (key: string) => {
        return translations[currentLanguage]?.[key] || key;
    };

  return (
    <main className="main" id="home">
        <div className="container">
            <div className="left-side" data-aos="fade-right">
                <h1>{(t("Grow your Business Google Ads & Instagram Ads"))}
                </h1>
                <p>{(t("It is a long established fact that a reader will be distracted by the readable."))}</p>
                <div className="btn-main">
                    <button className="btn-contact">{(t("Contact Us"))}</button>
                    <button className="btn-video">
                        <FaPlayCircle/>
                        {(t("Intro Video"))}
                    </button>
                </div>
            </div>
            <div className="right-side" data-aos="fade-left">
                <img src={RightImg} alt="#" />
            </div>
        </div>
    </main>
  )
}

export default Main