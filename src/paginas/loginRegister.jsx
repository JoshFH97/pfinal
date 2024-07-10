import { useEffect, useState } from 'react';
import { fetchGet, fetchPost } from '../Fetch/Api';
import { useNavigate } from 'react-router-dom';
import ColorSchemesExample from '../Componetes/NavBar/NavBar';

function Login() {
  const [active, setActive] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setActive("register");
  };

  const handleLoginClick = () => {
    setActive("login");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchGet('http://localhost:3000/users');
      const user = data.find(user => user.email === loginEmail && user.password === loginPassword);
      if (user) {
        localStorage.setItem("idUser",user.id)
        // Lógica de login exitosa
        alert("Login successful!");
        navigate('/'); // Redirigir a la página de inicio u otra página
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      const data = await fetchGet('http://localhost:3000/users');
      setDatos(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: userName,
      email: email,
      password: password,
    };

    try {
      const responseData = await fetchPost(userData, 'http://localhost:3000/users');
      console.log(responseData);
      alert("Registration successful!");
      setActive("login"); // Cambiar a la pestaña de login después del registro
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <>
      <ColorSchemesExample className='Navbar'/>
      <div className="login">
        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${active === "login" ? "active" : ""}`}
              id="tab-login"
              onClick={handleLoginClick}
              role="tab"
              aria-controls="pills-login"
              aria-selected={active === "login"}
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${active === "register" ? "active" : ""}`}
              id="tab-register"
              onClick={handleRegisterClick}
              role="tab"
              aria-controls="pills-register"
              aria-selected={active === "register"}
            >
              Register
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {active === "login" && (
            <div
              className="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form onSubmit={handleLoginSubmit}>
                <div className="text-center mb-3">
                  <p>Sign in with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f" />
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google" />
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter" />
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github" />
                  </button>
                </div>
                <p className="text-center">or:</p>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="loginEmail"
                    className="form-control"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="loginEmail">Email</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="loginPassword">Password</label>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center">
                    <div className="form-check mb-3 mb-md-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="loginCheck"
                      />
                      <label className="form-check-label" htmlFor="loginCheck">Remember me</label>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                <div className="text-center">
                  <p>Not a member? <a href="#!">Register</a></p>
                </div>
              </form>
            </div>
          )}

          {active === "register" && (
            <div
              className="tab-pane fade show active"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="tab-register"
            >
              <form onSubmit={handleRegisterSubmit}>
                <div className="text-center mb-3">
                  <p>Sign up with:</p>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f" />
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google" />
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter" />
                  </button>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github" />
                  </button>
                </div>
                <p className="text-center">or:</p>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="registerUsername"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="registerUsername">Username</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="registerEmail"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="registerEmail">Email</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="registerPassword"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="registerPassword">Password</label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="registerRepeatPassword"
                    className="form-control"
                    required
                  />
                  <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                </div>
                <div className="form-check d-flex justify-content-center mb-4">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="registerCheck"
                    required
                  />
                  <label className="form-check-label" htmlFor="registerCheck">
                    I have read and agree to the terms
                  </label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-3">Sign up</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
