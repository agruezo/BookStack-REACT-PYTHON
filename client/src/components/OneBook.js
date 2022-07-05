import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import openbook from './images/openBook.png';

const OneBook = () => {

    const [allBooks, setAllBooks] = useState([]);
    const { id } = useParams();
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/book/${id}`)
            .then((res) => {
                console.log(res.data);
                setBook(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteBookHandler = (id) => {
        axios.delete(`/api/book/${id}/delete`)
            .then((res) => {
                console.log(res.data);
                setAllBooks(allBooks.filter((book) => book.id !== id));
                navigate("/books")
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <Container fluid>
            <Row>
                <Col className="text-start text-light my-5">
                    <h1>BOOK STACK</h1>
                </Col>
                <Col className="text-end">
                    <Link to={"/books"}>
                        <Button variant="outline-light" className="my-5">HOME</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="my-3 py-2
            ">
                <Col className="text-start">
                    <h3 className="display-5 my-2">{ book.title }</h3>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={6}>
                <Row className="bg-primary border border-dark border-5 text-light">
                    <Col lg={6} className="text-center">
                        <p className="fw-bold my-3">Author:</p>
                    </Col>
                    <Col lg={6} className="text-center">
                        <p className="fw-bold my-3">{ book.author }</p>
                    </Col>
                </Row>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button variant="danger" className="border-2 fw-bold my-5" onClick={(e) => deleteBookHandler(id)}>REMOVE</Button>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center my-3">
                    <img src={openbook} alt="open-book" className="fluid" />
                </Col>
            </Row>
        </Container>
    )
}

export default OneBook;