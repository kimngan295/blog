import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, Modal, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Routes } from "../routes";

export const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const totalUsers = users.length

    const handleClose = () => {
        setShowForm(false);
    }

    useEffect(() => {
        axios.get('/get-all-user')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    const TableRow = (props) => {
        const { id, first_name, last_name, email } = props

        return (
            <tr>
                <td id={id}>
                    <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
                        {id}
                    </Card.Link>
                </td>
                <td>
                    <span className="fw-normal">
                        {first_name}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {last_name}
                    </span>
                </td>
                <td>
                    <span className="fw-normal">
                        {email}
                    </span>
                </td>
                <td>
                    <Dropdown as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                            <span className="icon icon-sm">
                                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item  className="text-danger">
                                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </td>

            </tr>
        )
    };

    return (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">id</th>
              <th className="border-bottom">First Name</th>
              <th className="border-bottom">Last Name</th>
              <th className="border-bottom">Email</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(t => <TableRow key={`users-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        {/* show form update post */}
        {/* <Modal show={showForm} onHide={handleClose}>
          {console.log(formData.title)}
          <Modal.Header closeButton>
            <Modal.Title>Update Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form id='formSubmit' onSubmit={handleUpdate}>
              <Form.Group className="mb-3" id='title'>
                <Form.Label>Title</Form.Label>
                <InputGroup >
                  <Form.Control
                    name='title'
                    type="text"
                    placeholder="Enter title"
                    // defaultValue={currentPost.title}
                    value={formData.title || ''}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" id='author'>
                <Form.Label>Author</Form.Label>
                <InputGroup>
                  <Form.Control
                    name='author'
                    type="text"
                    placeholder="Enter author"
                    value={formData.author || ''}
                    // defaultValue={currentPost.author}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" id='content'>
                <Form.Label>Content</Form.Label>
                <InputGroup>
                  <Form.Control
                    name='content'
                    type="text"
                    placeholder="Write content"
                    // defaultValue={currentPost.content}
                    value={formData.content || ''}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button form='formSubmit' variant="primary" type='submit'>Update Task</Button>
          </Modal.Footer>
        </Modal> */}
        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalPosts}</b> out of <b>25</b> entries
          </small>
        </Card.Footer> */}
      </Card.Body>
    </Card>
    )
}