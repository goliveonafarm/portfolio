import { Card, Row, Col } from 'react-bootstrap';
import Icon from '../Icon/Icon';
import './ProjectCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCode } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, imageOnLeft }) => {
    const { name, description, techStack, imageDir, link, url } = project;
    return (
        <Col sm={12} md={6} className='pb-3'>
            <Card className=' h-100'>
                <Row>
                    <Col xs={12} >
                        <Card.Img className='' src={imageDir} alt={`Screen shot of ${name} page`}></Card.Img>
                    </Col>
                    <Col xs={12}>
                        <Card.Body>
                            <Card.Title>
                                {name}
                            </Card.Title>
          
                            <Card.Text>
                                {description}
                            </Card.Text>
                            <Row>

                                <Col xs={12}>
                                    <Link to={link}>
                                        <FontAwesomeIcon icon={faLink} aria-label={`open ${name} page`} />
                                        <code className='font-monospace ps-1'>Hosted</code>
                                    </Link>
                                </Col>
                            </Row>
                            <Row className='pb-3'>
                                <Col xs={12}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faCode} aria-label={`open ${name} source code`} />
                                        <code className='font-monospace ps-1'>Source</code>
                                    </a>
                                </Col>
                            </Row>
                            <Row className='text-center'>
                                {techStack.map((tech, index) => (
                                    <Col xs key={`col-project-card-teck-stack-${index}`}>
                                        <Icon iconName={tech} />
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}

export default ProjectCard;