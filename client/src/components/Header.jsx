import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

export const Header = () => {
    return (
        <header>
            <Navbar bg="light" data-bs-theme="light" expand='lg'>
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/counter">Counter</Nav.Link>
                        <Nav.Link href="/artist">Artist</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </header>
    )
}
