import React from 'react';
import { useState } from 'react';

const LogIn = ({ loginHandler }) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
      });

  return (
    <div className="log-in-page">
        <div className="white-box">
            <img src="/images/universal-logo-big.png" />
            <form className="log-in-form" onSubmit={(e) => loginHandler(e, form)}>
                <p>Login</p>
                <input type="email" id="login-email" name="login-email" placeholder="Email" required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                <input type="password" id="login-pass" name="login-password" placeholder="Password" required 
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}/>
                <input type="submit" />
                
            </form>
        </div>
    </div>
  )
}

export default LogIn