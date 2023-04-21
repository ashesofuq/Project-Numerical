import React, { useState, useEffect } from "react"
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";
import { inv, multiply } from 'mathjs'
import Plot from 'react-plotly.js';
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';

const SimpleRegression =()=>{

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
                    axios.get('http://localhost:3333/linear_regression')
                        .then((response) => setJsonData(response.data))
                }
            })
    }, [])

    const InputChange = () => {
        console.log(JsonData[0]);
        const newData = JSON.parse(JsonData[0].data)
        setMatrix(newData);
        setA(newData[0]);
        setB(newData[1]);
        setX(JsonData[0].x);
        setSize(JsonData[0].n);
    }

    const print = () =>{
        const newData = data.flat();        
        // console.log(newData);
        return(            
            <Container>
                {newData.map((element, i) => {
                    return (
                        <div key={i}>
                            a{i+1}={element}
                        </div>
                    )
                })}
                
                <br />      
            </Container>           
        );
    }

    const data =[];   
    const CalSimpleRegression = (xValues, yValues) => {
        const n = xValues.length;
        const xSum = xValues.reduce((acc, val) => acc+val, 0);
        const ySum = yValues.reduce((acc, val) => acc+val, 0);
        const xPower2 = xValues.reduce((acc, val) => acc+val*val, 0);
        const xySum = xValues.map((val, i) => val*yValues[i]).reduce((acc, val) => acc+val, 0);

        const aMatrix = [[n, xSum], [xSum, xPower2]];
        const bMatrix = [ySum, xySum];

        const A_inv = inv(aMatrix);
        const xMatrix = multiply(A_inv, bMatrix);
        data.push(xMatrix);
        const data2 = data.flat();

        let fx = data2[0] + (data2[1]*X);
        setAnswer(fx);

        const lineX = [];
        const lineY = [];

        for (let i = 0; i < xValues.length; i++) {
            const val = xValues[i];
            let yVal = 0;

            for (let j = 0; j < data2.length; j++) {
                yVal += data2[j] * Math.pow(val, j);
            }

            lineX.push(val);
            lineY.push(yVal);
        }

        setxLine(lineX);
        setyLine(lineY);
        console.log(lineX);
        console.log(lineY);
    }

    const [html, setHtml] = useState(null);        
    const [A, setA] = useState([])
    const [B, setB] = useState([])
    const [X, setX] = useState(0)
    const [xLine, setxLine] = useState(0)
    const [yLine, setyLine] = useState(0)
    const [Answer, setAnswer] = useState(0)
    // const [firstInputValue, setFirstInputValue] = useState(0);

    const [size, setSize] = useState(0);
    const [matrix, setMatrix] = useState([]);

    const SizeChange = (event) => {
        const InputValue = parseInt(event.target.value);
        setSize(InputValue);

        const newMatrix = [];
        for (let i = 0; i < 2; i++) {
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
        setMatrix(newMatrix);

        const newA = newMatrix[0];
        const newB = newMatrix[1];
        console.log(newA);
        console.log(newB);
        setA(newA);
        setB(newB);
    }

    // const UpdateMatrix = () => {
    //     const newMatrix = [...matrix];
    //     newMatrix[0][0] -= 0;
    //     setMatrix(newMatrix);        
    // }

    const InputX = (event) =>{
        console.log(event.target.value)
        setX(event.target.value)
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
        CalSimpleRegression(A, B);        
        setHtml(print());
        
    }
    const exampleInput = () => {
        InputChange();
    }
 
    return (
        <Container fluid="md">
            <center>
            <br />
            <h2>Simple Linear Regression</h2>
            <br />
            <Row>
                <Col>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={2}>Input X</Form.Label>    
                        <Col sm={2}><input type="number" id="InputX" value={X} onChange={InputX} style={{width:"100%"}} className="form-control"></input></Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label column sm={2}>Input Value Size</Form.Label>
                        <Col sm={2}><input type="number" id="InputSize" value={size} onChange={SizeChange} style={{width:"100%"}} className="form-control"></input></Col>
                    </Form.Group>
                    
                    {matrix.map((row, i) => (
                        <div key={i}>           
                            <label style={{marginRight:"20px"}}>{i === 0 ? "X" : "Y"}</label>
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
                    
                    {/* <Button variant="dart" onClick={UpdateMatrix}>update!!</Button> */}
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

export default SimpleRegression