import ProjectCard from "./ProjectCard";
import projectsJSON from '../../Data/projects.json';

export const Projects = () => {
    return (
        projectsJSON.map((project, index) => (
            <ProjectCard
                project={project}
                key={`project-card-${index}`}
            />
        ))
    )
}

export default Projects;