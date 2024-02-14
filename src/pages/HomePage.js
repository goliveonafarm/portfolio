import { Row } from "react-bootstrap";
import Projects from "../components/project-components/Projects";

const HomePage = () => {
    return (
        <Row>
            <h1>Thank you for visiting my portfolio.</h1>
            <h2>Major Projects -</h2>
            <Projects />
        </Row>
    )
}

export default HomePage;