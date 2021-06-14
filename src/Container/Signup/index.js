import React from 'react'
import Input from '../../Components/UI/Input/index'
import Layout from '../../Components/Layout';
import {Container,Form,Row,Col,Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import signup from '../../actions/user.action';
/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const auth=useSelector(state=>state.auth);
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const dispatch=useDispatch();
  const user=useSelector(state=>state.user);
  const userSignup=(e)=>{
    e.preventDefault();
    const user={
      firstName,lastName,email,password
    }
    dispatch(signup(user));
  }
  if(auth.authenticate){
    return <Redirect to='/'></Redirect>;
  }
  if(user.loading){
    return <p>Loading...</p>
  }
  return(
    <>
    <Layout>
      <Container>
        {user.message}
        <Row style={{marginTop:'50px'}}>
          <Col md={{span:6,offset:3}}>
            <Form onSubmit={userSignup}>
              <Row>
                  <Col md={6}>
                  <Input label="First Name" placeholder="First Name" value={firstName} type ="text" onchange={(e)=>setFirstName(e.target.value)}></Input>
                  </Col>
                  <Col md={6}>
                    <Input label="Last Name" placeholder="Last Name" value={lastName} type ="text" onchange={(e)=>setLastName(e.target.value)}></Input>
                  </Col>
              </Row>
              <Input label="Email" placeholder="email" value={email} type ="email" onchange={(e)=>setEmail(e.target.value)}></Input>
              <Input label="Password" placeholder="password" value={password} type ="password" onchange={(e)=>setPassword(e.target.value)}></Input>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
   </>
   )
 }

export default Signup