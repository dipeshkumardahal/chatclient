import React,{ useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
function Chat() {
    const [message, setMessage] = useState("");
    const[response, setResponse] = useState("Nothing Asked");

  
    const handleSubmit =(e)=>{
      e.preventDefault();
      fetch('http://localhost:3001/',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body: JSON.stringify({message}),
      }).then((res)=>res.json()).then((data)=>setResponse(data.message));
      setMessage("");
    }
  return (
    <div>
        <Container>
      <Form onSubmit={handleSubmit}>
        <Row className='my-5'>
          <Col xs={10}>
          <Form.Control type="text" value={message} placeholder="Ask Me Anything" onChange={(e)=>setMessage(e.target.value)} />
          </Col>
          <Col xs={2}>
          <Button variant="info" type="submit">
            Ask
          </Button>
          </Col>
          </Row>
          </Form>
        
        <Row>
          <b>{response}</b>
        </Row>
      </Container>
    </div>
  )
}

export default Chat