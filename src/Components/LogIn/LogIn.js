import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './LogIn.css'

function LogIn() {
    const navigate = useNavigate()
  return (
    <div className='logInContainer'>
        <h2>Bienvenid@ Admin</h2>
    <Form className='logInForm'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Usuario</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" onClick={()=>{
        navigate('/admin')
      }}>
        Ingresar
      </Button>
    </Form>
    </div>
  );
}

export default LogIn;