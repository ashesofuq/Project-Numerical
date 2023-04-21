import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';

function Home() {
  const [ShowButton, setShowButton] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem('token');
      if (!token) {
        setShowButton(false);
      }
  }, [])

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.reload();
  }
  return (
    <center>
      <br />
      <br />
      <h2>Welcome to Numerical Method Calculator</h2>
      <br />
      <Button variant="contained" href='/Bisection'>Let's Start</Button><br /><br />
      { ShowButton && <Button variant="contained" color="error" onClick={handleLogout} >Logout</Button>}
    </center>
  )
}

export default Home