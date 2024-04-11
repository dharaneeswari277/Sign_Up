import { Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import home from './home.png';
import tick from './tick.png';
import cross from './cross.png';
import './App.css';

const Login = () => {
  const [phone, setPhone] = useState('+91');
  const [hasFilled, setHasFilled] = useState(false);
  const [otp, setOtp] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();


  const handleSend = async (event) => {
    event.preventDefault();
    setHasFilled(true)
    try {
      const response = await fetch('/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: '123456'}), // Static OTP for demonstration
      });

      if (response.ok) {
        setSnackbarMessage('OTP sent');
        setSnackbarOpen(true);
        // OTP sent successfully
      } else {
        setSnackbarMessage('OTP not sent');
        setSnackbarOpen(true);
        // Error sending OTP
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }), // OTP entered by the user
      });

      if (response.ok) {
        setSnackbarMessage('OTP verified');
        setSnackbarOpen(true);
        // OTP verified successfully, redirect user to home page
       navigate('/home');
      } else {
        setSnackbarMessage('Invalid OTP');
        setSnackbarOpen(true);
        // Invalid OTP entered
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  if (!hasFilled) {
  return (
        <div className='grid-container'>
      <div className='grid-item'><img className="image" src={home} alt="home"/></div>
      <div className='grid-item'>
          <Typography sx={{ paddingTop: '100px'}} variant='h5' component='div'>Sign in to <span style={{color:"#f00f83"}}>Admin</span></Typography>
          <form onSubmit={handleSend}>
            <label style={{fontSize:"15px",marginBottom: "20px"}}><span style={{color:"red"}}>*</span> Mobile Number</label><br/>
            <input sx={{ width: '240px'}} variant='outlined' autoComplete='off' value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={13} required /><br></br>
            <button type='submit' variant='contained' sx={{ width: '240px', marginTop: '20px'}}>
              Send OTP
            </button>
          </form>
      </div>
      <div id="recaptcha"></div>
      </div>
  )
}else{
    return(
      <div className='grid-container'>
      <div className='grid-item'><img className="image" src={home} alt="home"/></div>
      <div className='grid-item'>
        <Typography sx={{ paddingTop: '100px'}} variant='h5' component='div'>Sign in to <span style={{color:"#f00f83"}}>Admin</span></Typography>
        <form onSubmit={verifyOtp}>
          <label style={{fontSize:"15px",marginBottom: "20px"}}><span style={{color:"red"}}>*</span> Mobile Number</label><br/>
          <input type="tel" style={{ width: '240px'}} autoComplete='off' value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={13} pattern="^\+91[0-9]{10}$" title="Please enter a valid 10 digit mobile number" required /><br/>
          <label style={{fontSize:"15px",marginBottom: "20px"}}><span style={{color:"red"}}>*</span> OTP</label><br/>
          <input type="text" style={{ width: '240px'}} label='OTP ' value={otp} onChange={(event) => setOtp(event.target.value)} maxLength={6} pattern="\d{6}" title="Please enter a valid 6 digit OTP" required /><br/>
          <button type='submit' style={{ width: '240px', marginTop: '20px'}}>Login</button>
        </form>
      </div>
      <div id="recaptcha"></div>
      <Snackbar
        open={snackbarOpen} 
        Duration={1000} 
        onClose={handleSnackbarClose}
        message={
          <div className="custom-snackbar">
            {snackbarMessage === 'OTP sent' ? (
              <img src={tick} alt="OTP" style={{ marginRight: '15px', width: '20px', height: '20px' }} />
            ) : (
              <img src={cross} alt="OTP" style={{ marginRight: '10px', width: '20px', height: '20px' }} />
            )}
            {snackbarMessage}
            <button className="hide" onClick={() => setSnackbarOpen(false)}>X</button>
          </div>
        } 
      />
    </div>
  )
}
}
export default Login;
