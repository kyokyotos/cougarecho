import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export const Header = () => {
    return (
        <Navbar bg="light" variant="light" expand="lg" className="px-3">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/counter">Counter</Nav.Link>
                    <Nav.Link href="/artist">Artist</Nav.Link>
                    <Nav.Link href="/homepage">Homepage</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}