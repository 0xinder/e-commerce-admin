import {react,useState} from 'react';
import Layout from '../../Components/Layout';
import Input from '../../Components/UI/Input/index';
import {login} from '../../actions';
import {Container,Form,Row,Col,Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useEffect } from 'react';

/**
* @author
* @function 
Signin
**/
const 
Signin = (props) => {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const dispatch=useDispatch();
  const auth=useSelector(state=>state.auth);
  const userLogin=(e)=>{
    e.preventDefault();
    const user ={
      email,password
    }
    dispatch(login(user));
  }
  if(auth.authenticate){
    return <Redirect to='/'></Redirect>;
  }
  return(
    <Layout>
      <Container>
        <Row style={{marginTop:'50px'}}>
          <Col md={{span:6,offset:3}}>
            <Form onSubmit={userLogin}>
              <Input label="Email" placeholder="email" value={email} type ="email" onchange={(e1)=>setEmail(e1.target.value)}></Input>
              <Input label="Password" placeholder="password" value={password} type ="password" onchange={(e)=>setPassword(e.target.value)}></Input>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
   )
 }

export default Signin;