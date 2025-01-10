import React from "react";
import "./ProjectCard.css";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img
          src={`http://localhost:5000/uploads/${project.image}`}
          alt={project.name}
          className="project-image"
        />
        <div className="overlay">
          <h3 className="project-name">{project.name}</h3>
          <button
            className="view-project-button"
            onClick={() => window.open(project.link, "_blank")}
          >
            Ver Proyecto
          </button>
        </div>
      </div>
      <p className="project-description">{project.description}</p>
    </div>
  );
}

export default ProjectCard;
