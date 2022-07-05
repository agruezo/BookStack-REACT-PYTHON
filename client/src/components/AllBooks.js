import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import book from './images/book.png';

const AllBooks = () => {

    const [allBooks, setAllBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/books")
            .then((res) => {
                console.log(res.data);
                setAllBooks(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

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
                <Col className="text-start">
                    <h1 className="text-light my-5">BOOK STACK</h1>
                </Col>
                <Col className="text-end">
                    <Link to={"/book/new"}>
                        <Button variant="outline-light" className="my-5">ADD BOOK</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center my-3">
                    <img src={book} alt="books" className="fluid" />
                </Col>
            </Row>
            <Row className="my-2 text-start">
                <p className="lead fs-1 text-center">These are your books</p>
            </Row>
            <Row>
                <Col>
                    <Table responsive striped className="bg-primary align-middle text-light">
                        <thead>
                            <tr className="bg-dark text-center">
                                <th>Title</th>
                                <th>Author</th>
                                <th>Added </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBooks.map((book, index) => (
                                <tr key={index} className="text-center">
                                    <td className="text-light">{book.title}</td>
                                    <td className="text-light">{book.author}</td>
                                    <td className="text-light">{book.created_at}</td>
                                    <td>
                                        <Link to={`/book/${book.id}`}>
                                            <Button type="button" className="btn btn-outline-dark text-light border-2 m-1">DETAILS</Button>
                                        </Link>
                                        <Link to={`/book/edit/${book.id}`}>
                                            <Button type="button" className="btn btn-outline-success text-light border-2 m-1">EDIT</Button>
                                        </Link>
                                        <Button type="button" className="btn btn-outline-danger text-light border-2 m-1" onClick={(e) => deleteBookHandler(book.id)} >REMOVE</Button>
                                    </td>
                                </tr> 
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )

}

export default AllBooks;