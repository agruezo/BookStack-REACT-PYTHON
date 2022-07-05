import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import book from './images/oneBook.png';

const NewBook = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const [errors,setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("/api/book/new",
        {
            title,
            author
        })
        .then((res) => {
            console.log(res.data);
            navigate("/");
        }).catch((err) => {
            console.log(err);
            setErrors(err.res.data.errors);
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
            <Row>
                <Col lg={9} className="mx-auto my-2 text-start">
                <p className="lead fs-1 text-center">Have another book to add?</p>
                </Col>
            </Row>
            <Row>
            <Col lg={9} className="mx-auto my-3">
            <Form className="bg-secondary rounded-3 p-3 text-light" onSubmit={onSubmitHandler}>
                <Col lg={6} className="mx-auto">
                <Form.Group className="my-2 py-2 text-start" controlId="formTitle">
                    <Form.Label className="text-light fs-4">Title</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        value={title}
                    />
                    {errors.title ? <span>{errors.title.message}</span> : null}
                </Form.Group>
                </Col>
                <Col lg={6} className="mx-auto">
                <Form.Group className="my-2 py-2 text-start" controlId="formAuthor">
                    <Form.Label className="text-light fs-4">Author</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => setAuthor(e.target.value)}
                        name="author"
                        value={author}
                    />
                    {errors.author ? <span>{errors.author.message}</span> : null}
                </Form.Group>
                </Col>
                <Col lg={6} className="text-center mx-auto">
                    <Button type="submit" variant="primary" className="border-2 fw-bold my-2">ADD BOOK</Button>
                </Col>
            </Form>
            </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center my-3">
                    <img src={book} className="fluid" alt="book" />
                </Col>
            </Row>
        </Container>
    )
}

export default NewBook;