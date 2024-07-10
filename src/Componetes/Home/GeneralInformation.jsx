import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import ColorSchemesExample from '../NavBar/NavBar';

function GeneralInformation() {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <>
      {/* Renderiza el componente de la barra de navegación */}
      <ColorSchemesExample />

      <div>
        <style>
          {`
            /* Estilos globales */
            html, body, #root {
              height: 100%;
              margin: 0;
              display: flex;
              flex-direction: column;
              font-family: Arial, sans-serif;
            }

            .navbar {
              margin-bottom: 20px;
              border-radius: 0;
              background-color: #0275d8;
              color: black;
            }

            .navbar-brand {
              font-size: 24px;
              font-weight: bold;
              color: black !important;
            }

            .navbar-nav .nav-link {
              color: black !important;
              margin-right: 15px;
            }

            .navbar-nav .nav-link:hover {
              color: #d4d4d4 !important;
            }

            .content {
              flex: 1;
              display: flex;
              flex-direction: column;
              padding: 20px;
              background-color: #f5f5f5;
            }

            .sidenav {
              padding-top: 20px;
              background-color: #f8f9fa;
              height: 100%;
              color: #333;
            }

            .sidenav p {
              margin: 0 0 10px;
            }

            .sidenav .well {
              background-color: white;
              padding: 20px;
              margin-bottom: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            footer {
              background-color: #555;
              color: white;
              padding: 15px;
              text-align: center;
              position: relative;
              bottom: 0;
              width: 100%;
            }

            .jumbotron {
              background-color: #0275d8;
              color: white;
              padding: 40px 25px;
              border-radius: 10px;
              margin-bottom: 30px;
              text-align: center;
            }

            .jumbotron h1 {
              font-size: 40px;
            }

            .jumbotron p {
              font-size: 20px;
            }

            .col-sm-8.text-left {
              padding: 20px;
              background-color: white;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              margin-bottom: 30px;
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

        {/* Contenedor principal con contenido centralizado */}
        <div className="container-fluid content">
          <div className="row">
            {/* Barra lateral izquierda con ofertas */}
            <div className="col-md-2 col-sm-3 sidenav">
              <div className="well">
                <p>Special Offer: Get 20% off all accessories this month!</p>
              </div>
              <div className="well">
                <p>Buy one get one free on select smartphone models!</p>
              </div>
            </div>
            {/* Sección principal con contenido */}
            <div className="col-md-8 col-sm-9 text-left">
              {/* Jumbotron para una bienvenida destacada */}
              <div className="jumbotron">
                <h1>Welcome to MovileSmart</h1>
                <p>Your one-stop shop for the latest and greatest in mobile technology.</p>
              </div>
              <h3>About Us</h3>
              <p>
                At MovileSmart, we are dedicated to providing our customers with the best selection of mobile phones, accessories, and services. Our knowledgeable staff is here to help you find the perfect device to meet your needs.
              </p>
              <h3>Our Products</h3>
              <p>
                We offer a wide range of products including the latest smartphones, tablets, and accessories from top brands like Apple, Samsung, and more. Whether you're looking for the latest iPhone or a budget-friendly Android device, we've got you covered.
              </p>
              <hr />
              <h3>Customer Testimonials</h3>
              <p>
                "Excellent service and a great selection of products. Highly recommend MovileSmart for all your mobile needs!" - Jane Doe
              </p>
              <p>
                "Found the perfect phone at an unbeatable price. The staff was incredibly helpful and knowledgeable." - John Smith
              </p>
            </div>
            {/* Barra lateral derecha con ofertas */}
            <div className="col-md-2 col-sm-3 sidenav">
              <div className="well">
                <p>Special Offer: Get 30% off all phone cases this month!</p>
              </div>
              <div className="well">
                <p>Trade in your old phone and get up to $200 off a new model!</p>
              </div>
            </div>
          </div>
        </div>
        {/* Pie de página */}
        <footer>
          <p>&copy; 2024 MovileSmart. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default GeneralInformation;
