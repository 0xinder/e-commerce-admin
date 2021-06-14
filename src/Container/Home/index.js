import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import Layout from '../../Components/Layout/index';
import {NavLink} from 'react-router-dom';
import './style.css';
/**
* @author
* @function Home
**/

const Home = (props) => {
  return(
  <Layout>
    <Container fluid>
      <Row>
        <Col md={2} className='sidebar'>
          <ul>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/page"}>Page</NavLink></li>
            <li><NavLink to={"/category"}>Category</NavLink></li>
            <li><NavLink to={"/products"}>Products</NavLink></li>
            <li><NavLink to={"/orders"}>Orders</NavLink></li>
          </ul>
        </Col>
        <Col md={10} style={{marginLeft:'auto'}}>Container</Col>
      </Row>
    </Container>
    {/* <Jumbotron style={{margin:'4rem',background:'#fff'}}className="text-center">
      <h1>Welcome To Admin Dashboard</h1>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </Jumbotron> */}
  </Layout>
   )

 }

export default Home;