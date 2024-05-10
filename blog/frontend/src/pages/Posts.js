import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown, Modal } from '@themesberg/react-bootstrap';
import axios from 'axios';

import { PostTable } from "../components/Tables";

axios.defaults.baseURL = 'http://localhost:3000'

export default () => {
  const [showForm, setShowForm] = useState(false);

  const handleNewTaskClick = () => {
    setShowForm((prev) => !prev);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const title = event.target.title.value;
    console.log('Title:', event.target.title.value);

    const data = {
      title: event.target.title.value,
      author: event.target.author.value,
      content: event.target.content.value,
    };

    axios.post('/new-post', data)
      .then((response) => {
        console.log('Create post successfully:', response.data);
        // setShowForm(false);
        // window.location.reload();
      })
      .catch((error) => {
        console.error('Create post failed:', error);
        alert('Create post failed: ' + error.message);
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Blog Admin</Breadcrumb.Item>
            <Breadcrumb.Item active>Posts</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Posts</h4>
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
              <FontAwesomeIcon icon={faPlus} /> New Post
            </Button>
          </Col>
          <Modal show={showForm} onHide={handleClose} onSubmit={handleSubmit}> {/* Modal để hiển thị form */}
            <Modal.Header closeButton>
              <Modal.Title>Create New Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form id='formSubmit'>
                <Form.Group id='title' className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <InputGroup>
                    <Form.Control name='title' type="text" placeholder="Enter title" />
                  </InputGroup>
                </Form.Group>
                <Form.Group id='author' className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <InputGroup>
                    <Form.Control name='author' type="text" placeholder="Enter author" />
                  </InputGroup>
                </Form.Group>
                <Form.Group id='content' className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <InputGroup>
                    <Form.Control name='content'  type="text" placeholder="Write content" />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" form='formSubmit' type='submit'>Create Post</Button>
            </Modal.Footer>
          </Modal>

          {/* <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu-xs dropdown-menu-right">
                <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                <Dropdown.Item className="d-flex fw-bold">
                  10 <span className="icon icon-small ms-auto"><FontAwesomeIcon icon={faCheck} /></span>
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                <Dropdown.Item className="fw-bold">30</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col> */}
        </Row>
      </div>


      <PostTable />
    </>
  );
};
