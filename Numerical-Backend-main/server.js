const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = 'ashestt'

// Swagger
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());

const mysql = require('mysql2');
// const host = 'localhost';
// if (process.env.NODE_ENV === 'production') {
//     host = 'mysql-server'
// }
// create the connection to database
const connection = mysql.createConnection({
    host: 'mysql-server',
    user: 'root',
    database: 'numerical-react',
    password: '1234'
});

// Register
app.post('/register', jsonParser, (req, res) => {
    const { username, password, fname, lname } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        try {
            connection.execute(
                'INSERT INTO users (username, password, fname, lname) VALUES (?, ?, ?, ?)',
                [username, hash, fname, lname],
                (err, results, fields) => {
                    if (err) {
                        res.json({status : 'Error', message : err})
                        return;
                    }
                    res.json({status : 'OK', msg: "Created successfully"});
                }
            );
        } catch (err) {
            res.json({status: 'Error', msg: err.message});
        }
    });    
})
// Login
app.post('/login', jsonParser, (req, res) => {
    const { username, password } = req.body;
    try {
        connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (err, results, fields) => {                
                if (err) {
                    res.json({status : 'Error', message : err});
                    return;
                }
                if (results.length == 0) {
                    res.json({status : 'Error', message : 'No user found'});
                    return;
                }
                bcrypt.compare(password, results[0].password, function(err, isLogin) {
                    if (isLogin) {
                        const token = jwt.sign({ username: results[0].username }, secret, { expiresIn: '1h' });
                        res.json({status: 'OK', msg: "Login successfully", token});
                    } else {
                        res.json({status: 'Error', msg: "Login failed. Password is incorrect"});
                    }
                });                
            }
        );
    } catch (err) {
        res.json({status: 'Error', msg: err.message});
    }
})

app.post('/auth', jsonParser, (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        res.json({status: 'OK', decoded});
    } catch (err) {
        res.json({status: 'Error', msg: err.message});
    }
});

// numerical method
app.get('/bisection', (req, res) => {
    connection.execute('SELECT * FROM bisection',
    (err, result) => {
        res.json(result)
    });
})
app.get('/bisection/:id', (req, res) => {
    connection.execute('SELECT * FROM bisection WHERE id = ' + req.params.id,
    (err, result) => {
        res.json(result)
    });
})
app.get('/falseposition', (req, res) => {
    connection.execute('SELECT * FROM falseposition',
    (err, result) => {
        res.json(result)
    });
})
app.get('/onepoint', (req, res) => {
    connection.execute('SELECT * FROM onepoint',
    (err, result) => {
        res.json(result)
    });
})
app.get('/taylor', (req, res) => {
    connection.execute('SELECT * FROM taylor',
    (err, result) => {
        res.json(result)
    });
})
app.get('/newton', (req, res) => {
    connection.execute('SELECT * FROM newton',
    (err, result) => {
        res.json(result)
    });
})
app.get('/secant', (req, res) => {
    connection.execute('SELECT * FROM secant',
    (err, result) => {
        res.json(result)
    });
})
app.get('/cramer', (req, res) => {
    connection.execute('SELECT * FROM cramer',
    (err, result) => {
        res.json(result)
    });
})
app.get('/matrix_inversion', (req, res) => {
    connection.execute('SELECT * FROM matrix_inversion',
    (err, result) => {
        res.json(result)
    });
})
app.get('/linear_regression', (req, res) => {
    connection.execute('SELECT * FROM linear_regression',
    (err, result) => {
        res.json(result)
    });
})
app.get('/polynomial_regression', (req, res) => {
    connection.execute('SELECT * FROM polynomial_regression',
    (err, result) => {
        res.json(result)
    });
})

app.listen(3333, () => {
  console.log('CORS-enabled web server listening on Port 3333')
})