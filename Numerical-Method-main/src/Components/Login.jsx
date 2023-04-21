import React, { useState } from 'react';
import { Button, Container, Form, Table, Row, Col } from "react-bootstrap";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container>
    <form method='POST' action='http://localhost:3002/login'>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>      
      <Button type='submit'>Login</Button>
    </form>
    </Container>
  );
}

export default LoginPage;
