import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import "./Projects.css";

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error al cargar proyectos:", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="projects-page">
            <h1 className="projects-title">Proyectos</h1>
            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </div>
    );
}

export default Projects;