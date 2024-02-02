import ProjectCard from "../components/project-components/ProjectCard";
import projectsJSON from '../Data/projects.json'


const HomePage = () => {
    return (
        <div>
            <h1>Thank you for visiting my portfolio.</h1>
            <h2>Major Projects -</h2>
            {projectsJSON.map((project, index) => (
                <ProjectCard
                    project={project}
                    key={`project-card-${index}`}
                    imageOnLeft={index % 2 === 0}
                />
            ))}
        </div>
    )
}

export default HomePage;