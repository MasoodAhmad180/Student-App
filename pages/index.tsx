import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { useState } from 'react'
import useStudents from '@/customHooks/usestudents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {
    name,
    fatherName,
    phone,
    students,
    visible,
    isUpdate,
    searchText,
    setName,
    setfatherName,
    setImageUrl,
    setPhone,
    setVisible,
    closeHandler,
    onSubmitHandler,
    onAddHandler,
    onDeleteHandler,
    onEditHandler,
    onUpdateHandler,
    onFileChangeHandler
    
  } = useStudents()


  return (
    <>
      <nav className="navbar  bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bolder" href="#">Navbar</a>
          <button type="button" className="btn btn-light fw-medium" onClick={onAddHandler}>Add Student</button>
          <form className="d-flex " role="search">
            <input className="form-control me-2 d-none d-sm-block" type="search" placeholder="Search" aria-label="Search" />
            <button type="submit" className="btn btn-light fw-medium d-none d-sm-block">Search</button>
          </form>
        </div>
      </nav>

      <table className="table mt-5 mx-auto">
        <thead className='table-primary'>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Student's Name</th>
            <th scope="col">Father's Name</th>
            <th scope="col">Phone No.</th>
            <th scope="col">Picture</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {students.map((item) => {
            return (
              <tr key={item.id} className='align-middle fw-bold'>
                <th scope="row">{item.no}</th>
                <td>{item.name.split(' ').map((word) => word.slice(0,1).toUpperCase() + word.slice(1)).join(' ')}</td>
                <td>{item.fatherName.split(' ').map((word) => word.slice(0,1).toUpperCase() + word.slice(1)).join(' ')}
                </td>
                <td>
                  {item.phone}
                </td>
                <td><img src={item.image} alt="name" width={50} height={50} /></td>
                <td>

                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ fontSize: 18, marginRight:"10px"}}
                      onClick={() => onDeleteHandler(item)}
                      className='text-danger'
                    />
                  
                  <FontAwesomeIcon
                      icon={faPencil}
                      style={{ fontSize: 18}}
                      onClick={() => onEditHandler(item)}
                      className='text-primary'
                    />
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div>

        <Modal
          closeButton
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header>
            <Text id="modal-title" size={20} h2>
              Add New Students
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Enter Studednt's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Enter Father's Name"
              value={fatherName}
              onChange={(e) => setfatherName(e.target.value)}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              type='file'
              placeholder="Enter ImageUrl"
              onChange={onFileChangeHandler}
            />
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder=" Enter Phone No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onPress={closeHandler}>
              Close
            </Button>
            {isUpdate ? <Button auto onPress={onUpdateHandler}>
              Update
            </Button>
              : <Button auto onPress={onSubmitHandler}>
                Submit
              </Button>
            }
          </Modal.Footer>
        </Modal>

        {/* <p> lorem dnfjn,jbsdjhbvf,jcxbhvbdf,sbgvhdsfbhfdjkbghfbdbgfhdsbjsdfhgjhdfkdfh <p/> */}
      </div>
    </>
  )
}
