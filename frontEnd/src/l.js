import { useNavigate } from 'react-router-dom';
import { Typography, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
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

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("Recaptcha")
        handleSend();
      }
    });
  }

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setSnackbarMessage('OTP sent');
        setSnackbarOpen(true);
        console.log("OTP Sent");
      }).catch((error) => {
        console.log("OTP not sent");
        setSnackbarMessage('OTP not sent');
        setSnackbarOpen(true);
      })
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      if (confirmationResult) {
        confirmationResult.confirm(otp)
          .then((result) => {
            let user = result.user;
            console.log(user);
            navigate('/home');
          })
          .catch((error) => {
            setSnackbarMessage('Invalid OTP');
            setSnackbarOpen(true);
            console.log("Invalid OTP")
          });
      } else {
        console.log("Confirmation result is undefined");
        setSnackbarMessage('Please try again.');
        setSnackbarOpen(true);
      }
    }
  }

  if (!hasFilled) {
    return (
      <div className='grid-container'>      
        <div className='grid-item'><img className="image" src={home} alt="home"/></div>
        <div className='grid-item'>
            <Typography sx={{ paddingTop: '100px'}} variant='h5' component='div'>Sign in to <span style={{color:"#f00f83"}}>Admin</span></Typography>
            <form onSubmit={handleSend}>
              <label style={{fontSize:"15px",marginBottom: "20px"}}><span style={{color:"red"}}>*</span> Mobile Number</label><br/>
              <input sx={{ width: '240px'}} variant='outlined' autoComplete='off' value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={13} pattern="^\+91[0-9]{10}$" title="Please enter a valid 10 digit mobile number" required /><br></br>
              <button type='submit' variant='contained' sx={{ width: '240px', marginTop: '20px'}}>
                Send OTP
              </button>
            </form>
        </div>
        <div id="recaptcha"></div>
      </div>
    ) 
  } else {
    return (
      <div className='grid-container'>
        <div className='grid-item'><img className="image" src={home} alt="home"/></div>
        <div className='grid-item'>
            <Typography sx={{ paddingTop: '100px'}} variant='h5' component='div'>Sign in to <span style={{color:"#f00f83"}}>Admin</span></Typography>
            <form onSubmit={verifyOtp}>
              <label style={{fontSize:"15px",marginBottom: "20px"}}><span style={{color:"red"}}>*</span> Mobile Number</label><br/>
              <input sx={{ width: '240px'}} variant='outlined' autoComplete='off' value={phone} onChange={(event) => setPhone(event.target.value)} maxLength={13} pattern="^\+91[0-9]{10}$" title="Please enter a valid 10 digit mobile number" required /><br></br>
              <label style={{fontSize:"15px",marginBottom: "20px"}}><span style={{color:"red"}}>*</span> OTP</label><br/>
              <input sx={{ width: '240px'}} variant='outlined' label='OTP ' value={otp} onChange={verifyOtp} maxLength={6} pattern="\d{6}" title="Please enter a valid 6 digit otp number" required /><br/>
              <button type='submit' variant='contained' sx={{ width: '240px', marginTop: '20px'}}>Login</button>
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
