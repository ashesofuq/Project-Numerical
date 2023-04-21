import { useState, useEffect } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Newton =()=>{

    const [JsonData, setJsonData] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('token');
        const instance = axios.create({
            baseURL: 'http://localhost:3333',
            headers: { Authorization: 'Bearer ' + token}
        });
        instance.post('/auth')
            .then((response) => {
                if (response.data.status === 'Error'){
                    alert('Please Login to use Example Problem');
                } else {
                    axios.get('http://localhost:3333/newton')
                        .then((response) => setJsonData(response.data))
                }
            })
    }, [])

    const InputChange = () => {
        console.log(JsonData[0]);
        setEquation(JsonData[0].equation);
        setX0(JsonData[0].x0);
    }

    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X_new));        
        setValueError(data.map((x)=>x.error));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="30%">X</th>                            
                            <th width="30%">ERROR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X_new}</td>                                
                                <td>{element.error}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalNewton = (x0) => {
        var x_new,fx0,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj={};
        const d = derivative(Equation, 'x');
        do{
            const derivativeAtX = d.evaluate({x: x0});
            scope = {
                x:x0
            }
            fx0 = evaluate(Equation, scope);
            x_new = x0 - (fx0 / derivativeAtX)

            iter ++;
            ea = error(x0, x_new);
            obj = {
                iteration:iter,
                X_new:x_new,
                error:ea
            }
            data.push(obj);
            x0 = x_new;            
        }while(ea>e && iter<MAX)
        setX(x_new)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);    
    const [valueError, setValueError] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(1)
    

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const data1 = {
        x: valueIter,
        y: valueX0,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'green'},
        name : 'X'
    };

    const data2 = {
        x: valueIter,
        y: valueError,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},    
        name : 'Error'
    };
  
    const layout = {
        title: 'Chart',
        autosize: true,
        xaxis: {title: 'Iteration'},
        yaxis: {title: 'X and Error'}
    };
    let plot = [data1, data2];
    
    const calculateRoot = () =>{
        const x0 = parseFloat(X0);        
        CalNewton(x0);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueX0)
    }

    return (
            <Container fluid="md">
                <br />
                <h2>Newton Raphson Method</h2>
                <br />
                <Row>
                    <Col sm={6}>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="">Input Re-Write f(x)</Form.Label>
                            <Col sm={8}><input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"100%"}} className="form-control"></input></Col>                        
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="">Input X0</Form.Label>
                            <Col sm={8}><input type="number" id="X0" value={X0} onChange={inputX0} style={{width:"100%"}} className="form-control"></input></Col>
                        </Form.Group>                    

                        <center>
                            <Button variant="dark" onClick={InputChange} style={{margin:"50px"}} >Example Problem</Button>
                            <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
                        </center>
                    </Form>
                
                    <br></br>
                    <h5>Answer = {X.toPrecision(7)}</h5><br />
                    {html}
                    </Col>
                    <Col sm={5}>                        
                        <Plot data={plot} layout={layout} />
                    </Col>
                </Row>       
            </Container>           
    )
}

export default Newton