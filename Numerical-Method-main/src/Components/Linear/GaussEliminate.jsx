import React, { useState } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { det } from 'mathjs'

import 'bootstrap/dist/css/bootstrap.css';

const GaussEliminate =()=>{
    const print = () =>{
        const newData = data.flat();
        
        let result = 0;
        let str = '';
        const check = [];
        const labels = [];
        for (let i=0; i<A.length; i++){
            for (let j=0; j<A.length; j++){
                result += newData[j] * A[i][j];
                str += A[i][j] + `(${newData[j]}) + `;
            }
            str = str.slice(0, -2);
            str += `= ${result}`
            check.push(result);
            labels.push(str);
            result = 0;
            str = '';
        }
        console.log(A);
        console.log(newData);
        console.log(check);
        console.log(labels);
        return(
            
            <Container>
                {newData.map((element, i) => {
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
    const CalGaussEliminate = (A, B) => {
        
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
        // console.log(newMatrix);
        const newA = newMatrix.map(row => row.slice(0, -1));
        const newB = newMatrix.map(row => row[newMatrix.length]);
        console.log(newA);
        console.log(newB);
        setA(newA);
        setB(newB);
        setMatrix(newMatrix);
    }
 
    const calculateMatrix = () =>{        
        CalGaussEliminate(A, B);
        setHtml(print());
        
    }
    const exampleInput = () => {

    }

    return (
        <Container fluid="md">
            <center>
                <br />
                <h2>GaussEliminate Method</h2>
                <br />
                <Row>
                    <Col>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label column sm={2}>Input Matrix Size</Form.Label>
                            <Col sm={2}><input type="number" id="InputSize" onChange={SizeChange} style={{width:"100%"}} className="form-control"></input></Col>
                        </Form.Group>
                        <p>Matrix {size} x {size}</p>
                        
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
                        <Button variant="dart" onClick={exampleInput}>Click!!</Button>
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

export default GaussEliminate