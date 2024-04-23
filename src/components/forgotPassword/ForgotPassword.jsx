import "./forgotPassword.css";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const ForgotPassword = () => {
    const [phone, setPhone] = useState('');
    const [securityQuestion, setSecurityQuestion] = useState('');
    const [securityAnswer, setSecurityAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showSecurityButton, setShowSecurityButton] = useState(false)

    const navigate = useNavigate()

    const handleSecurityQuestion = async () => {
      try {
        if (!phone) {
          setMessage("Please enter a phone number.");
          return;
        }
    
        const response = await axios.post('/auth/forgotPassword', { phone });
        console.log("Response:", response);
    
        if (response.data.securityQuestion) {
          setSecurityQuestion(response.data.securityQuestion);
          setShowSecurityButton(true);
          setMessage('');
        } else {
          setShowSecurityButton(false);
          setMessage("Mobile number not found");
        }
      } catch (error) {
        console.error("Error: ", error);
        setMessage('Failed to fetch security question');
      }
    }
    

    const handleResetPassword = async () => {
      try {
       const response = await axios.post("/auth/resetPassword", { phone, securityAnswer, newPassword });

        if (response.data.message === "Invalid Security Answer"){ 
            setMessage(response.data.message);
          }
        else {
        setMessage("Your password has been reset successfully!");
        setPhone('');
        setSecurityQuestion('')
        setSecurityAnswer('')
        setNewPassword('');
        navigate("/login")
        }
      } catch (error) {
        console.error(error)
        console.log(error.response.data.message)
        if (error.response.data.message === "Invalid Security Answer"){
          setMessage("Incorrect Answer");
        } else{
          setMessage('Failed to reset password')
        }
      }
    }

  return (
    <div className="fgpwContainer">
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)} />
      <br />
      {showSecurityButton ? (
        <>
          <button onClick={handleSecurityQuestion}>Security Question</button>
          <select className="question" value={securityQuestion} onChange={(e) => setSecurityQuestion(e.target.value)}>
            <option value="">Select Security Question</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What is the name of your first pet?">What is the name of your first pet?</option>
            <option value="In what city were you born?">In what city were you born?</option>
            <option value="What is your favorite book?">What is your favorite book?</option>
            <option value="What is the name of your best childhood friend?">What is the name of your best childhood friend?</option>
          </select>
          <br />
          <input
            type="text"
            placeholder="Security Answer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)} />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} />
          <button className="resetButton" onClick={handleResetPassword}>Reset Password</button>
        </>
      ) : (
        <button onClick={handleSecurityQuestion}>Check Mobile</button>
      )}
      {message && <p>{message}</p>}
    </div>
  )
}

export default ForgotPassword