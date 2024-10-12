import React from 'react'
import { CougarAudioPlayer } from './AudioPlayer'
import { Col, Container, Row } from 'react-bootstrap'

export const Footer = () => {
    return (
        <footer>
            <Container >
                <Row>
                    <Col className='py-3'>
                        CougarEcho
                    </Col>
                    <Col>
                        <CougarAudioPlayer />
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}
