import Icon from "../components/Icon/Icon";
import { Row, Col } from 'react-bootstrap';

const AboutPage = () => {
    let stackList=['JavaScript', 'NodeJs', 'React', 'HTML', 'CSS', 'Bootstrap', 'MongoDb', 'C', 'CSharp', 'SQL'];
    return (
        <div className="">
            <h1>About</h1>
            <p>I'm most familiar with JavaScript. I've spent much time learning about the language on a fundamental level.
            </p>
            <p>I am hoping to not only build a solid foundation for my React development, but also increase my knowledge of the C language.
            </p>
            <p>I have watched “Learn Multiplatform 8086 Assembly” by ChibiAkumas to get a better understanding of the C. Though this doesn't perfectly translate over to JavaScript, I have also watched “JavaScript: Understanding the Weird Parts” by Anthony Alicea to get a firm understanding of that language. In addition to those, I've also watched “C# Tutorial For Beginners” and “SQL Server Tutorial” series by KudVenkat.
            </p>
            <p>Right now I am putting most of my effort into learning more about the React framework, expanding my skills as a JavaScript developer, and building upon my portfolio.
            </p>
            <Row className="pb-3 text-center">
                {stackList.map((item, index)=>(
                     <Col xs key={`col-stack-list-${index}`}>
                        <Icon iconName={item}></Icon>
                     </Col>
                ))}
            </Row>
        </div>
    )
}

export default AboutPage;