import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <>
        <Header />
        <main>
          <Container tag="main">
            {this.props.children}
          </Container>
        </main>
        <Footer />
      </>
    );
  }
}
