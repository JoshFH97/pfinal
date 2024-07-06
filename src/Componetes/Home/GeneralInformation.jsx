import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <head>
        <title>Bootstrap Example</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        />
        <style>
          {`
            html, body, #root {
              height: 100%;
              margin: 0;
              display: flex;
              flex-direction: column;
            }
            .navbar {
              margin-bottom: 0;
              border-radius: 0;
            }
            .content {
              flex: 1;
              display: flex;
              flex-direction: column;
            }
            .sidenav {
              padding-top: 20px;
              background-color: #f1f1f1;
              height: 100%;
            }
            footer {
              background-color: #555;
              color: white;
              padding: 15px;
              position: relative;
              bottom: 0;
              width: 100%;
            }
            @media screen and (max-width: 767px) {
              .sidenav {
                height: auto;
                padding: 15px;
              }
              .row.content {
                height: auto;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div className="container-fluid text-center content">
          <div className="row content">
            <div className="col-sm-2 sidenav">
              <p>
                <a href="#">Link</a>
              </p>
              <p>
                <a href="#">Link</a>
              </p>
              <p>
                <a href="#">Link</a>
              </p>
            </div>
            <div className="col-sm-8 text-left">
              <h1>Welcome</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <hr />
              <h3>Test</h3>
              <p>Lorem ipsum...</p>
            </div>
            <div className="col-sm-2 sidenav">
              <div className="well">
                <p>ADS</p>
              </div>
              <div className="well">
                <p>ADS</p>
              </div>
            </div>
          </div>
        </div>
        <footer className="container-fluid text-center">
          <p>Footer Text</p>
        </footer>
      </body>
    </>
  );
}

export default App;
