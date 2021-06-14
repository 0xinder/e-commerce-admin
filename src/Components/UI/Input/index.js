import React from 'react'
import { Form } from 'react-bootstrap'

/**
* @author
* @function Input
**/

const Input = (props) => {
  return(
      <Form.Group controlid="formBasicEmail">
          {props.label&&<Form.Label>{props.label}</Form.Label>}
          <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onchange}></Form.Control>
          <Form.Text className="text-muted">
              {props.errorMessage}
          </Form.Text>
      </Form.Group>
   )

 }

export default Input