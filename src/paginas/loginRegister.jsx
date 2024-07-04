import { useEffect, useState } from 'react';
import {fetchGet, fetchPost} from '../Fetch/Api';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [active, setActive] = useState("login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [datos, setDatos]=useState()
  // const navigate = useNavigate()

  const handleRegisterClick = () => {
    setActive("register");
  };

  const handleLoginClick = () => {
    setActive("login");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    get()
  };

  useEffect(()=>{
    get()
  }, []);

  async function get() {
    const data = await fetchGet('http://localhost:3001/users');
    setDatos(data)
  }


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: userName,
      email: email,
      password: password
    };

    try {
      const responseData = await fetchPost(userData, 'http://localhost:3001/users' );
      console.log(responseData);
    } catch (error) {
      console.error('Hubo un problema con la solicitud Fetch:', error);
    }
  };

  return (
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
                <input type="email" id="loginName" className="form-control" />
                <label className="form-label" htmlFor="loginName">Email or username</label>
              </div>
              <div className="form-outline mb-4">
                <input type="password" id="loginPassword" className="form-control" />
                <label className="form-label" htmlFor="loginPassword">Password</label>
              </div>
              <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="form-check mb-3 mb-md-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="loginCheck"
                      defaultChecked
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
                <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" id="registerUsername" className="form-control" />
                <label className="form-label" htmlFor="registerUsername">Username</label>
              </div>
              <div className="form-outline mb-4">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="registerEmail" className="form-control" />
                <label className="form-label" htmlFor="registerEmail">Email</label>
              </div>
              <div className="form-outline mb-4">
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="registerPassword" className="form-control" />
                <label className="form-label" htmlFor="registerPassword">Password</label>
              </div>
              <div className="form-outline mb-4">
                <input type="password" id="registerRepeatPassword" className="form-control" />
                <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
              </div>
              <div className="form-check d-flex justify-content-center mb-4">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  defaultValue=""
                  id="registerCheck"
                  defaultChecked
                  aria-describedby="registerCheckHelpText"
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
  );
}

export default Login;
