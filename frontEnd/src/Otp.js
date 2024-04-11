import home from './home.png';
import './App.css';

function Otp() {
  return (

<div class="grid-container">
<div class="grid-item">  
<img className="image" src={home} alt="home"/>
</div>
<div class="grid-item">

  <p>Sign in to <span style={{color:"#f00f83"}}> Admin</span></p>
  <form>
    <label style={{fontSize:"15px"}}><span style={{color:"red"}}>*</span> Mobile Number</label>
    <input type="tel" pattern="[0-9]{10}" placeholder="+91" maxlength="10" required></input><br/>
    <label style={{fontSize:"15px"}}><span style={{color:"red"}}>*</span> OTP</label><br/>
    <input  type="text" ></input>
    <button>Login</button>
    </form>
</div>
</div>
  );
}

export default Otp;
