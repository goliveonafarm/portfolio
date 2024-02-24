import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return(
        <footer className="footer">
            <Container className='text-center'>
                <p>© 2023-2024 John Coburn. All Rights Reserved.</p>
                <p>Contact me at <a href="mailto:johncoburn.it@gmail.com">johncoburn.it@gmail.com</a></p>
            </Container>
        </footer>
    )
}

export default Footer;