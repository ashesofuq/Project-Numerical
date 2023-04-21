import React, { useState, useEffect } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { det } from 'mathjs'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';

const CramerRule =()=>{
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
                    axios.get('http://localhost:3333/cramer')
                        .then((response) => setJsonData(response.data))
                }
            })
    }, [])

    const InputChange = () => {
        console.log(JsonData[0]);
        const newMatrix = JSON.parse(JsonData[0].matrix);        
        const newA = newMatrix.map(row => row.slice(0, -1));
        const newB = newMatrix.map(row => row[newMatrix.length]);
        setMatrix(newMatrix);
        setA(newA);
        setB(newB);
        setSize(JsonData[0].size);
    }

    const print = () =>{
        let result = 0;
        let str = '';
        const check = [];
        const labels = [];
        for (let i=0; i<A.length; i++){
            for (let j=0; j<A.length; j++){
                result += data[j] * A[i][j];         
                str += A[i][j] + `(${data[j]}) + `;
            }
            str = str.slice(0, -2);
            str += `= ${result}`
            check.push(result);
            labels.push(str);
            result = 0;
            str = '';
        } 
        console.log(data)     
        console.log(check);
        console.log(labels);
        return(
            
            <Container>
                {data.map((element, i) => {
                    return (
                        <div key={i}>
                            X{i+1}={element}
                        </div>
                    )
                })}
                {/* {check.map((element, i) => {
                    return (
                        <div key={i}>{element}</div>
                    )
                })} */}
                <br />
                <h5>Check Answer</h5>
                {labels.map((element, i) => {
                    return (
                        <div key={i}>{element}</div>
                    )
                })}
                                
            </Container>
           
        );
    }
    

    
    const data =[];   
    const CalCramerRule = (A, B) => {
        let detA = det(A)
        if (detA === 0) {
            return;
        }
        
        for (let i=0; i<A.length; i++) {
            let Ax = A.map(value => value.slice());
            for (let j=0; j<Ax.length; j++){
                Ax[j][i] = B[j];
            }
            let detAx = det(Ax);
            data.push(detAx / detA);
        }        
    }

      
     
   
    const [html, setHtml] = useState(null);        
    const [A, setA] = useState([])
    const [B, setB] = useState([])

    const [size, setSize] = useState(0);
    const [matrix, setMatrix] = useState([]);

    const SizeChange = (event) => {
        const InputValue = parseInt(event.target.value);
        setSize(InputValue);

        const newMatrix = [];
        for (let i = 0; i < InputValue; i++) {
            const newRow = [];
            for (let j = 0; j <= InputValue; j++){
                newRow.push(0);
            }
            newMatrix.push(newRow);
        }
        setMatrix(newMatrix);
    }

    const NumberChange = (event, rowIndex, ColIndex) => {
        const InputValue = parseInt(event.target.value);

        const newMatrix = matrix.map((row, i) => {
            if (i === rowIndex) {
                return row.map((col, j) => (j === ColIndex ? InputValue : col));
            } else {
                return row;
            }
        });
        console.log(newMatrix);
        const newA = newMatrix.map(row => row.slice(0, -1));
        const newB = newMatrix.map(row => row[newMatrix.length]);
        console.log(newA);
        console.log(newB);
        setA(newA);
        setB(newB);
        setMatrix(newMatrix);
    }
 
    const calculateMatrix = () =>{        
        CalCramerRule(A, B);        
        setHtml(print());
        
    }
    const exampleInput = () => {
        InputChange();
    }

    // const headerMatrix = Array.from({ length: size }, (_, i) => `x${i+1}`);
    // headerMatrix.push("B");    
    
    return (
            <Container fluid="md">
                <center>
                <br />
                <h2>CramerRule Method</h2>
                <br />
                <Row>
                    <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label column sm={2}>Input Matrix Size</Form.Label>
                            <Col sm={2}><input type="number" id="InputSize" value={size} onChange={SizeChange} style={{width:"100%"}} className="form-control"></input></Col>
                        </Form.Group>
                        <p>Matrix {size} x {size}</p>
                        {/* <br />
                        <table>
                            <thead>
                                <tr>
                                    <th>B</th>                       
                                </tr>
                            </thead>
                            <tbody>
                                {matrix.map((row, i) => (
                                    <tr key={i}>                                        
                                        {row.map((col, j) => (
                                            <React.Fragment key={j}>
                                                <input type="number" value={col} onChange={(event) => NumberChange(event, i, j)} 
                                                    style={{ margin:"1px", width:"3em", background:"white", color:"black", border:"1px solid black", borderRadius:"5px"}} />
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table> */}
                        {matrix.map((row, i) => (                            
                            <div key={i}>
                                {row.map((col, j) => (
                                    <React.Fragment key={j}>
                                        <input type="number" value={col} onChange={(event) => NumberChange(event, i, j)} 
                                            style={{ margin:"1px", width:"3em", background:"white", color:"black", border:"1px solid black", borderRadius:"5px"}} />
                                    </React.Fragment>
                                ))}
                                <br />
                            </div>
                        ))}      
                        <br />
                        <Button variant="White" onClick={exampleInput}>Example</Button>
                        <Button variant="dark" onClick={calculateMatrix}>Calculate</Button>
                        <br />                        
                    </Form>
                
                    <br></br>
                    <h5>Answer</h5><br />
                    <Container fluid>{html}</Container>                    
                    </Col>
                </Row>       
                </center>
            </Container>           
    )
}

export default CramerRule