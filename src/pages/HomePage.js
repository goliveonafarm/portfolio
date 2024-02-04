import ProjectCard from "../components/project-components/ProjectCard";
import projectsJSON from '../Data/projects.json'
import { Row } from "react-bootstrap";


const HomePage = () => {
    return (
        <Row>
            <h1>Thank you for visiting my portfolio.</h1>
            <h2>Major Projects -</h2>
            {projectsJSON.map((project, index) => (
                <ProjectCard
                    project={project}
                    key={`project-card-${index}`}
                    imageOnLeft={index % 2 === 0}
                />
            ))}
        </Row>
    )
}

export default HomePage;