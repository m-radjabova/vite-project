import { Category, Project } from "../page/home/Home";
import { useState } from "react";


interface Props {
  project: Project[];
  category: Category[];
  translations: {
    [key: string]: {
      [key: string]: string;
    };
  };
  currentLanguage: string;   
}

function SectionProject({ project, category, translations, currentLanguage }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const t = (key: string) => {
    return translations[currentLanguage]?.[key] || key;
  };

  const filteredProjects =
    activeCategory === "All"
      ? project
      : project.filter((p) => {
          const categorys = category.find((c) => c.name === activeCategory);
          return categorys && p.categoryId === categorys.id;
      });
      
  return (
    <div className="section-project" id="projects">
        <div className="section-project__title">
            <h2>{t('Our Projects')}</h2> 
            <p>{t('Creative & Proffesional Creative Agency!')}</p> 
        </div>
      <div className="category-tabs">
        {["All", ...category.filter((c) => c.name !== "All").map((c) => c.name)].map((cat) => (
          <p
            key={cat}
            className={`tab ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </p>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="project-card" data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
          >
            <img src={proj.imgUrl} alt="#" className="project-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionProject;