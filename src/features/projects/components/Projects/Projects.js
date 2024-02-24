import projectsJSON from '../../data/projects.json';
import ProjectCard from '../ProjectCard/ProjectCard';

const Projects = () => {
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