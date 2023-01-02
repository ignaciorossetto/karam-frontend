import React, { useState, useContext } from "react";
import "./ResponsiveHeader.css";
import MenuIcon from "@mui/icons-material/Menu";
import Cart from "../NavBar/Cart/Cart";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { CartContext } from "../../../Context/CartContext/CartContext";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const ResponsiveHeader = () => {
  const { freeShipping } = useContext(CartContext);
  const [show, setShow] = useState(false);
  return (
    <>
      <p className="freeShippingResponsive">
        Envios gratis a partir de ${freeShipping.toLocaleString()}
      </p>
      <div className="container">
        <h1 className="headerTitle">KARAM</h1>
        <div className="headerMenu">
          <MenuIcon
            fontSize="large"
            onClick={() => setShow(true)}
            style={{ cursor: "pointer" }}
          />
          <Cart />
        </div>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modalW"
        aria-labelledby="example-custom-modal-styling-title"
        fullscreen
        style={{ width: "150px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="example-custom-modal-styling-title"
            className="modalMenuTitle"
          >
            MENU
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="responsive__menuContainer">
          <div>
            <ul className="responsive__menu">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/nosotros">Nosotros</NavLink>
              </li>
              <li>
                <NavLink to="/contacto">Contacto</NavLink>
              </li>
              <li>
                <NavDropdown
                  title="Productos"
                  id="basic-nav-dropdown"
                  className="subMenuProductos"
                >
                  <NavLink
                    to="/products/category/almohadon"
                    className="navlinks"
                  >
                    <p>Almohadones</p>
                  </NavLink>
                  <NavLink to="/products/category/bolso" className="navlinks">
                    <p>Bolsos</p>
                  </NavLink>
                  <NavLink
                    to="/products/category/ropadecama"
                    className="navlinks"
                  >
                    <p>Ropa de cama</p>
                  </NavLink>
                </NavDropdown>
              </li>
            </ul>
          </div>
          <div>
            <NavLink to='/admin/login'
            >
              Login
            </NavLink>
        
          </div>
        </Modal.Body>

      </Modal>
    </>
  );
};

export default ResponsiveHeader;
