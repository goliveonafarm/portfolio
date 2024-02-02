import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const MyNavbar = () => {
    const location = useLocation();
    const isActive = (path) => { return location.pathname === path };

    return (
        <>
            <div className="d-none d-md-block">
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/emoji-translator" active={isActive('/emoji-translator')}>Emoji Translator</Nav.Link>
                            <Nav.Link as={Link} to="/grocery-list" active={isActive('/grocery-list')}>Grocery List</Nav.Link>
                            <Nav.Link as={Link} to="/about" active={isActive('/about')}>About</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <hr />
            </div>
            <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary d-md-none">
                <Container>
                    <Navbar.Brand as={Link} to="/">Portfolio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/emoji-translator" active={isActive('/emoji-translator')}>Emoji Translator</Nav.Link>
                            <Nav.Link as={Link} to="/grocery-list" active={isActive('/grocery-list')}>Grocery List</Nav.Link>
                            <Nav.Link as={Link} to="/about" active={isActive('/about')}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MyNavbar;
