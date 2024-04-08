import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import img_cursos from "../../assets/img/img_cursos.jpg";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function CardCurso({ curso, id_curso }) {

    console.log("desde CardCurso")
  return (
        <Card className="border border-primary mx-auto" style={{ width: '16rem', height:'28rem' }} >
            <Card.Img variant="top" src={img_cursos} alt='img'/>
            <Card.Body>
                <Card.Title>{curso.titulo}</Card.Title>
                <Card.Text>{curso.objetivo}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Profesor Asignado: {curso.profesor.nombre}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
            <Link to={`/cursosDetail/${curso.id_curso}`}><Button variant="primary">Ver contenido</Button></Link>
                {/* s */}
            </Card.Body>
        </Card>
  );
}

export default CardCurso