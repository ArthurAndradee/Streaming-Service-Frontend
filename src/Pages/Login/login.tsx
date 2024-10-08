import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import WelcomeHeader from '../../Components/Headers/Login/welcome';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/profile-picker');
      } else {
        console.error('Login failed:', data.message || 'An error occurred');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='welcome-main'>
      <div className='welcome-main'>
        <WelcomeHeader />
        <div className='d-flex flex-column align-items-center m-5'>
          <h3 className='text-light display-2'>Unlimited movies, TV shows, and more</h3>
          <p className='text-light mt-3 mt-5' style={{ fontSize: '1.75rem' }}>Watch anywhere. Cancel anytime</p>
          <p className='text-light mb-3 mb-5' style={{ fontSize: '1.75rem' }}>Ready to watch? Enter your email and password to log in.</p>
          <form className='d-flex flex-column align-items-center w-50' onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control mb-3 w-75"
              placeholder="Your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="input-group mb-3 w-75">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Your password here"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button type='submit' className='btn btn-lg btn-danger w-25'>
              Log In {'>'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;