import { useState, useEffect } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { evaluate, derivative, factorial } from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';

const Taylor =()=>{

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
                    axios.get('http://localhost:3333/taylor')
                        .then((response) => setJsonData(response.data))
                }
            })
    }, [])

    const InputChange = () => {
        console.log(JsonData[0]);
        setEquation(JsonData[0].equation);
        setX0(JsonData[0].x0);
        setXa(JsonData[0].x);
        setN(JsonData[0].n);
    }

    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.N));
        setValueX0(data.map((x)=>x.fx));        
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
                                <td>{element.N}</td>
                                <td>{element.fx}</td>                                
                                <td>{element.error}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;

    const CalTaylor = (x0,X,N) => {
        let fx, derivativeAtX, d, X0, scope, ea;
        let i=1;

        scope = {
            x:X
        }
        const actual = evaluate(Equation, scope);
        X0 = {
            x:x0
        }        
        let diff = Equation.toString()
        
        let obj={ };
        for(i=1;i<=N;i++){
            if(i == 1){
                fx = evaluate(Equation , X0);
                ea = error(fx, actual);
                obj = {
                    N:i,
                    fx:fx,
                    error:ea
                }
                data.push(obj);
            }
            else if(derivative(diff, 'x') != 0){
                console.log(diff);

                d = derivative(diff,'x')
                diff = d.toString()    
                console.log(diff);
                
                derivativeAtX = evaluate(diff,X0)
                console.log(derivativeAtX);
                fx = fx+((Math.pow(X-x0,i-1) / factorial(i-1)) *derivativeAtX);         
                ea = error(fx, actual);       
                obj = {
                    N:i,
                    fx:fx,
                    error:ea                   
                }
                data.push(obj);                
            }
            else{
                break;
            }            
        }
        setX(fx);
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);    
    const [valueError, setValueError] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("log(x)")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [N,setN] = useState(0)
    const [Xa,setXa] = useState(0)
    

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }

    const inputXa = (event) =>{
        console.log(event.target.value)
        setXa(event.target.value)
    }

    const inputN = (event) =>{
        console.log(event.target.value)
        setN(event.target.value)
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
        const x = parseFloat(Xa);       
        const n = parseFloat(N);
        CalTaylor(x0, x, n);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueX0)
    }

    return (
            <Container fluid="md">
                <br />
                <h2>Taylor Series Method</h2>
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

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="">Input X</Form.Label>
                            <Col sm={8}><input type="number" id="Xa" value={Xa} onChange={inputXa} style={{width:"100%"}} className="form-control"></input></Col>
                        </Form.Group>        

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={3} className="">Input N</Form.Label>
                            <Col sm={8}><input type="number" id="N" value={N} onChange={inputN} style={{width:"100%"}} className="form-control"></input></Col>
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

export default Taylor