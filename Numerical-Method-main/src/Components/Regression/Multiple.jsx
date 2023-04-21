import React, { useState, useEffect } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { inv, multiply, transpose } from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';

const Multiple =()=>{
    const print = () =>{        
        const newData = data.flat();        
        console.log(newData);        
        return(            
            <Container>
                {newData.map((element, i) => {
                    return (
                        <div key={i}>
                            a{i+1}={element.toPrecision(7)}
                        </div>
                    )
                })}
                
                <br />      
            </Container>           
        );
    }

    const data =[];   
    const CalMultiple = (xValues, yValues) => {                        
        const n = xValues[0].length;
        const p = xValues.length;
        
        const x0 = Array(n).fill(1); // for the intercept term

        const aMatrix = [];
        for(let i=0; i<n; i++){
            const row = [x0[i]];
            for(let j=0; j<p; j++){
                row.push(xValues[j][i]);
            }
            aMatrix.push(row);
        }
        console.log(aMatrix);
        const ATrans = transpose(aMatrix);
        const ATransA = multiply(ATrans, aMatrix);
        const ATransAInv = inv(ATransA);
        const ATransY = multiply(ATrans, yValues);
        const beta = multiply(ATransAInv, ATransY);
        
        console.log(beta);
        data.push(beta);        
        const data2 = data.flat();
        console.log(data2);

        let fx = data2[0];
        for(let i=0; i<p; i++){
            fx += data2[i+1]*X;
        }
        setAnswer(fx);

        // const lineX = [];
        // const lineY = [];

        // for (let i = 0; i < xValues[0].length; i++) {
        //     const val = xValues[i][i];
        //     let yVal = 0;

        //     for (let j = 0; j < data2.length; j++) {
        //         yVal += data2[j] * Math.pow(val, j);
        //     }

        //     lineX.push(val);
        //     lineY.push(yVal);
        // }
        // setxLine(lineX);
        // setyLine(lineY);
        // console.log(lineX);
        // console.log(lineY);
    }

    const [html, setHtml] = useState(null);        
    const [A, setA] = useState([])
    const [B, setB] = useState([])
    const [X, setX] = useState(0)
    const [Order, setOrder] = useState(0)
    const [xLine, setxLine] = useState(0)
    const [yLine, setyLine] = useState(0)
    const [Answer, setAnswer] = useState(0)

    const [size, setSize] = useState(0);
    const [matrix, setMatrix] = useState([]);

    const SizeChange = (event) => {
        const InputValue = parseInt(event.target.value);
        setSize(InputValue);

        const newMatrix = [];
        for (let i = 0; i <= Order; i++) {
            const newCol = [];
            for (let j = 0; j < InputValue; j++){
                newCol.push(0);
            }
            newMatrix.push(newCol);
        }
        setMatrix(newMatrix);
    }

    const NumberChange = (event, rowIndex, ColIndex) => {
        const InputValue = parseFloat(event.target.value);

        const newMatrix = matrix.map((row, i) => {
            if (i === rowIndex) {
                return row.map((col, j) => (j === ColIndex ? InputValue : col));
            } else {
                return row;
            }
        });
        console.log(newMatrix);
        const newA = newMatrix.slice(0, -1);
        const newB = newMatrix[newMatrix.length-1];
        console.log(newA);
        console.log(newB);
        setA(newA);
        setB(newB);
        setMatrix(newMatrix);
    }

    const InputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
    }
    const InputOrder = (event) =>{
        console.log(event.target.value)
        setOrder(event.target.value)
    }

    const trace1 = {
        x: xLine,
        y: yLine,
        type: 'scatter',
        mode: 'lines',
        marker: {color: 'green'},
        name : 'Linear Regression'
    };

    const trace2 = {
        x: A,
        y: B,
        type: 'scatter',
        mode: 'markers',
        marker: {color: 'red'},
        name : 'Data'
    };
  
    const layout = {
        title: 'Linear Regression Plot',
        xaxis: {title: 'X'},
        yaxis: {title: 'Y'}

    };
    let plot = [trace1, trace2];
 
    const calculateMatrix = () =>{
        // let degree = parseInt(Order)
        CalMultiple(A, B);
        setHtml(print());
        
    }
    const exampleInput = () => {
        // InputChange();
    }
 
    return (
        <Container fluid="md">
            <center>
            <br />
            <h2>Multiple Linear Regression</h2>
            <br />
            <Row>
                <Col>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={2}>Input X</Form.Label>    
                        <Col sm={2}><input type="number" id="InputX" onChange={InputX} style={{width:"100%"}} className="form-control"></input></Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={2}>Input Order</Form.Label>
                        <Col sm={2}><input type="number" id="InputOrder" onChange={InputOrder} style={{width:"100%"}} className="form-control"></input></Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={2}>Input Value Size</Form.Label>
                        <Col sm={2}><input type="number" id="InputSize" onChange={SizeChange} style={{width:"100%"}} className="form-control"></input></Col>
                    </Form.Group>
                    
                    {matrix.map((row, i) => (
                        <div key={i}>           
                            <label style={{marginRight:"20px"}}>{i === matrix.length - 1 ? "Y : " : "X"+(i+1)}</label>
                            {row.map((col, j) => (
                                <React.Fragment key={j}>
                                    <input type="number" step="any" value={col} onChange={(event) => NumberChange(event, i, j)} 
                                        style={{ margin:"1px", width:"3em", background:"white", color:"black", border:"1px solid black", borderRadius:"5px"}} />
                                </React.Fragment>
                            ))}
                            <br />
                        </div>
                    ))}      
                    <br />
                    <Button variant="white" onClick={exampleInput}>Example</Button>
                    <Button variant="dark" onClick={calculateMatrix}>Calculate</Button>
                    <br />
                </Form>
            
                <br></br>
                <h5>Answer = {Answer.toPrecision(7)}</h5><br />
                <Container fluid>{html}</Container>
                </Col>
                <Col sm={5}>
                    <Plot data={plot} layout={layout} />
                </Col>
            </Row>       
            </center>
        </Container>           
    )
}

export default Multiple