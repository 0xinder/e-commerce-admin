import React from 'react'
import { Navbar,NavDropdown,Nav,Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {Link,NavLink} from 'react-router-dom';
import { signout } from '../../actions/auth.action';
/**
* @author
* @function Header
**/
const Header = (props) => {
  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const logout=()=>{
    dispatch(signout())
  }
  const renderNonLoggedInLinks=()=>{
        return (
        <Nav>
          {/* <Nav.Link href="#deets">Sign In</Nav.Link> */}
          <li className="nav-item">
            <NavLink to="Signin" className="nav-link">
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="Signup" className="nav-link">
              Signup
            </NavLink>
          </li>
        </Nav>);
    }
    const renderLoggedInLinks=()=>{
        return (<Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={logout}>Sign out</span>
            </li>
        </Nav>)
    }
    return (
        <>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
                <Container fluid>
                {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                <Link to="/" className="navbar=brand"> Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {auth.authenticate?renderLoggedInLinks():renderNonLoggedInLinks()};
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}

export default Header