import Icon from "../components/Icon/Icon";
import { Row, Col } from 'react-bootstrap';

const AboutPage = () => {
    let stackList=['JavaScript', 'NodeJs', 'React', 'HTML', 'CSS', 'Bootstrap', 'MongoDb', 'C', 'CSharp', 'SQL'];
    return (
        <div className="">
            <h1>About</h1>
            <p>I'm most familiar with JavaScript. I've spent much time learning about the language on a fundamental level.
            </p>
            <p>I am hoping to not only build a solid foundation for my JavaScript coding, but also increase my knowledge of the C language.
            </p>
            <p>I can produce applications using Windows Forms in C, C++, or C#. I can implement basic DB connections as well. I can also make an application in ASM (currently 8086 but I can probably port to x86 easily enough). I tend to only use Windows Forms when solving challenges I come across in real life, which most of the time is data entry.
                I also know Java syntax but I've only used it a couple times and it's not listed on my resume.
            </p>
            <p>Right now I'm putting most of my energy into learning more about the React framework, expanding my skills as a JavaScript developer, and building upon my portfolio.
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