import Icon from '../components/ui/Icon/Icon';
import { Row, Col } from 'react-bootstrap';

const AboutPage = () => {
    let stackList=['JavaScript', 'NodeJs', 'React', 'HTML', 'CSS', 'Bootstrap', 'MongoDb', 'C', 'CSharp', 'SQL'];
    return (
        <div>
            <h1>About</h1>
            <p>I have developed a strong foundation in JavaScript, dedicating a significant amount of time to understanding the language at a fundamental level.
            </p>
            <p>My current focus is on building an equally strong foundation in React development, while also expanding my knowledge of various other programming skills and languages.
            </p>
            <p>To broaden my skill set, I've explored different areas. I have watched 'Learn Multiplatform 8086 Assembly' by ChibiAkumas to gain insights into C, even though it doesn't directly relate to JavaScript. Additionally, I completed the 'JavaScript: Understanding the Weird Parts' course by Anthony Alicea to strengthen my grasp of JavaScript. I've also explored 'C# Tutorial For Beginners' and 'SQL Server Tutorial' series by KudVenkat.
            </p>
            <p>Currently, my primary goal is to deepen my understanding of the React framework, enhance my capabilities as a JavaScript developer, and expand my portfolio.
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