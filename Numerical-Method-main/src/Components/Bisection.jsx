import { useState, useEffect } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { evaluate } from 'mathjs'
import axios from 'axios'

import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.css';

const Bisection = () => { 
    // ล่าสุด -> เปลี่ยน DB
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
                    axios.get('http://localhost:3333/bisection')
                        .then((response) => setJsonData(response.data))
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    const InputChange = () => {
        console.log(JsonData[0]);
        setEquation(JsonData[0].equation);
        setXL(JsonData[0].xl);
        setXR(JsonData[0].xr);
    }


    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr));
        setValueError(data.map((x)=>x.error));
        return(
            <Container>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th width="10%">Iteration</th>
                            <th width="20%">XL</th>
                            <th width="20%">XM</th>
                            <th width="20%">XR</th>
                            <th width="20%">ERROR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                                <td>{element.error}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calbisection = (xl, xr) => {
        var xm,fXm,fXr,ea,scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var obj={};
        do
        {            
            xm = (xl+xr)/2.0;
            scope = {
                x:xr
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x:xm
            }
            fXm = evaluate(Equation, scope)

            iter++;
            if(fXm*fXr > 0){
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    error:ea
                }
                data.push(obj);  
                xr = xm;
            } else {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr,
                    error:ea
                }
                data.push(obj);
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    }

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]);
    const [valueError, setValueError] = useState([]);    
    const [Apikey, setApikey] = useState('');
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("(x^4)-13")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)    

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }    
          
    const data1 = {
        x: valueIter,
        y: valueXm,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'green'},
        name : 'Xm'
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
        xaxis: {title: 'Iteration'},
        yaxis: {title: 'X and Error'}

    };
    let plot = [data1, data2];
    
    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum,xrnum);        
     
        setHtml(print());
    }
    const exampleInput = () => {
        InputChange();
    }
    

    return (
        <Container fluid>
            <br />
            <h2>Bisection Method</h2>
            <br />
            <Row>
                <Col sm={6}>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} className="text-center" >Input f(x)</Form.Label>
                            <Col sm={10}><input type="text" id="equation" data-testid="equation" value={Equation} onChange={inputEquation} style={{width:"100%"}} className="form-control"></input></Col>                        
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">                        
                            <Form.Label column sm={2} className="text-center">Input XL</Form.Label>
                            <Col sm={10}><input type="number" id="XL" data-testid="XL" value={XL} onChange={inputXL} style={{width:"100%"}} className="form-control"></input></Col>                        
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2} className="text-center">Input XR</Form.Label>
                            <Col sm={10}><input type="number" id="XR" data-testid="XR" value={XR} onChange={inputXR} style={{width:"100%"}} className="form-control"></input></Col>
                        </Form.Group>    
                    </Form>
                    <center>                        
                        <Button variant="dark" onClick={exampleInput} style={{margin:"50px"}}>Example Problem</Button>
                        <Button variant="dark" onClick={calculateRoot}>Calculate</Button>
                    </center>
                    <br />
                    <h5>Answer = {X.toPrecision(7)}</h5>
                    {html}
                </Col>
                <Col sm={5}>
                    <Plot data={plot} layout={layout} />
                </Col>                
            </Row>
        </Container>           
    )
}

export default Bisection
