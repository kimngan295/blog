import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal } from '@themesberg/react-bootstrap';
import axios from 'axios';

import { UserTable } from '../components/UserComponent';

axios.defaults.baseURL = 'http://localhost:3000'

export default () => {
    const [showForm, setShowForm] = useState(false);

    const handleNewTaskClick = () => {
        setShowForm((prev) => !prev);
    };

    const handleClose = () => {
        setShowForm(false);
    };

    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // const title = event.target.title.value;
    //     console.log('Title:', event.target.title.value);

    //     const data = {
    //       title: event.target.title.value,
    //       author: event.target.author.value,
    //       content: event.target.content.value,
    //     };

    //     axios.post('/new-post', data)
    //       .then((response) => {
    //         console.log('Create post successfully:', response.data);
    //         // setShowForm(false);
    //         // window.location.reload();
    //       })
    //       .catch((error) => {
    //         console.error('Create post failed:', error);
    //         alert('Create post failed: ' + error.message);
    //       });
    //   };

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                <div className="d-block mb-4 mb-md-0">
                    <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
                        <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
                        <Breadcrumb.Item>Blog Admin</Breadcrumb.Item>
                        <Breadcrumb.Item active>Users</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4>Users</h4>
                    <p className="mb-0">Your web analytics dashboard template.</p>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <ButtonGroup>
                        <Button variant="outline-primary" size="sm">Share</Button>
                        <Button variant="outline-primary" size="sm">Export</Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className="table-settings mb-4">
                <Row className="justify-content-between align-items-center">
                    <Col xs={8} md={6} lg={3} xl={4}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Search" />
                        </InputGroup>
                    </Col>
                    <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
                        <Button variant="outline-primary" size="sm" onClick={handleNewTaskClick}>
                            <FontAwesomeIcon icon={faPlus} /> New User
                        </Button>
                    </Col>
                    <Modal show={showForm} onHide={handleClose} > {/* Modal để hiển thị form */}
                        <Modal.Header closeButton>
                            <Modal.Title>Create New User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form id='formSubmit'>
                                <Form.Group id='firstname' className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control name='firstname' type="text" placeholder="Enter your firstname" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id='lastname' className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <InputGroup>
                                        <Form.Control name='lastname' type="text" placeholder="Enter your lastname" />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group id='email' className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control name='email' type="text" placeholder="Enter your email" />
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" form='formSubmit' type='submit'>Create User</Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </div>
            <UserTable />
        </>
    );
};