import loginGIF from "../../assets/loginGIF.gif"
import "./login.css"
import {  UserOutlined } from '@ant-design/icons';
import { Input,  } from 'antd';
import { useState } from 'react';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post('http://localhost:3000/login', { username, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
  
        // Redirecionar com base no nível de acesso
        if (data.role === 'admin') window.location.href = '/admin';
        else window.location.href = '/operator';
    } catch (err) {
        setError('Credenciais inválidas');
    }
  };
  return (
    <div>
      <div className="login-container">
        <div className="login-left">
            <h1>Faça login <br /> E acesse seu sistema</h1>
        <img src={loginGIF} alt="" />
        </div>

            <div className="login-right">
                   <div className="login-form">
                        <h1>Login</h1>
                              <form onSubmit={handleSubmit}>
                                 <Input prefix={<UserOutlined />} className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                                 <Input.Password placeholder="input password " value={password} onChange={(e) => setPassword(e.target.value)}/>
      
                                <button  type="submit">Entrar</button>
                                            {error && <p>{error}</p>}

                                </form>
                    </div>
            </div>
    </div>
    </div>
  )
}

export default Login