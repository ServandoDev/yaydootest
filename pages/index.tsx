import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';

const Home: NextPage = () => {

  // constructor
  const router = useRouter();

  // flags
  const [passwordOrEmailWrong, setPasswordOrEmailWrong] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // login function, on submit form click on login button
  const login = async (event: any) => {
    setLoading(true);
    // prevent form default action
    event.preventDefault();

    // reset states
    setEmailInvalid(false);
    setPasswordLength(false);
    setPasswordOrEmailWrong(false);
    setLoginSuccess(false);

    // get input values
    const email = event.target.email.value;
    const password = event.target.password.value;
    const patternEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    // validators
    if (password.length < 6) {
      setPasswordLength(true);
      setLoading(false);
      return;
    }
    if (!patternEmail.test(email)) {
      setEmailInvalid(true);
      setLoading(false);
      return;
    }
    // show loading
    setLoginSuccess(true);

    // fetch api post login
    await fetch(`https://reqres.in/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then(response => response.json()).then((data: any) => {
      setLoading(false);
      // validate response
      if (data.error) {
        setPasswordOrEmailWrong(true);
      } else if (data.token) {
        router.push({
          pathname: '/list',
          query: { email: email }
        });
      }
      setLoginSuccess(false);
    }).catch(() => {
      setLoading(false);
      // show error message
      setPasswordOrEmailWrong(true);
    });
  };

  return (
    <div>
      <main className='page'>
        <div className='container-fluid p-5'>
          <div className='d-flex flex-row justify-content-center align-content-center'>
            <span className="material-icons text-white">
              chat
            </span>
          </div>
          <div className='d-flex flex-row justify-content-center align-content-center'>
            <p className='text-white'>Welcome back!</p>
          </div>
          <div className='d-flex w-100 justify-content-center align-items-center'>
            <form onSubmit={login}>
              <div className='card'>
                <div className='card-content p-5'>
                  <div className="mb-3">
                    <input required type="email" className="form-control" id="email" name="email" placeholder="Email address"></input>
                  </div>
                  <div className="mb-3">
                    <input required type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
                  </div>
                  <div className='mb-3'>
                    {emailInvalid ?
                      <div className="alert alert-danger d-flex align-content-center" role="alert">
                        <span className="material-icons">
                          cancel
                        </span>
                        Please enter a valid email address.
                      </div>
                      : null
                    }
                    {passwordLength ?
                      <div className="alert alert-danger d-flex align-content-center" role="alert">
                        <span className="material-icons">
                          cancel
                        </span>
                        The password must be at least 6 characters length.
                      </div>
                      : null
                    }
                    {
                      passwordOrEmailWrong ?
                        <div className="alert alert-danger d-flex align-content-center" role="alert">
                          <span className="material-icons">
                            cancel
                          </span>
                          Login fail, check the password or the email.
                        </div>
                        : null
                    }
                  </div>
                  <div className="mb-3 d-grid gap-2 d-flex justify-content-center w-100">
                    <button type='submit' className='btn btn-primary btn-login w-100'>
                      {loginSuccess ?
                        <div className="spinner-border text-info" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        : 'Login'
                      }

                    </button>
                  </div>
                  <div className='d-flex justify-content-end flex-row mt-2'>
                    <a className='link-primary' href='#'>Forgot your password?</a>
                  </div>
                  <div className='d-flex justify-content-end flex-row mt-2'>
                    <a className='link-primary' href='#'>Don´t have an account? Get started</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {
          loading ?
            <div className='loading-page'>
            </div>
            : null
        }
      </main>
    </div>
  )
};

export default Home
