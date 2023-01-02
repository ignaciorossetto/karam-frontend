import React from "react";
import "./AddProductForm.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const AddProductForm = (param) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let obj = {};
      const form = document.getElementById("addProductForm");
      const formData = new FormData(form);
      for (let pair of formData.entries()) {
        obj[pair[0]] = pair[1];
      }
      await axios.post(
        "https://karamhechoamano-backend.onrender.com/api/products",
        obj,
        {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }
      );
      
      Swal.fire({
        title: "Creaste un nuevo producto!!",
        confirmButtonText: "Ir a admin de productos!",
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/admin");
        }
      });
    } catch (error) {
      Swal.fire({
        title: `Hubo un problema y no se puedo crear el producto! ${error}`,
        confirmButtonText: "Ir a admin de productos!",
        allowOutsideClick: false,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate("/admin");
        }
      });
    }
  };

  return (
    <div className="addProductFormContainer">
      <h1 className="formTitle">Agrega un producto!</h1>
      <form
      
        id="addProductForm"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="title"
          name="title"
          type="text"
          required
          onChange={param.newNameHandler}
        />
        <input
          placeholder="description"
          name="description"
          type="text"
          required
          onChange={param.newDescriptionHandler}
        />
        <input
          placeholder="price"
          name="price"
          type="number"
          required
          onChange={param.newPriceHandler}
        />
        <input
          placeholder="stock"
          name="stock"
          type="number"
          required
          onChange={param.newStockHandler}
        />
        <select
          placeholder="category"
          name="category"
          form="addProductForm"
          className="addProductSelect"
          required
        >
          <option value="category" disabled selected hidden>
            Elige una categoría
          </option>
          <option value="almohadon">almohadon</option>
          <option value="bolso">bolso</option>
        </select>
        <select
          name="disponible"
          form="addProductForm"
          className="addProductSelect"
          required
        >
          <option value="disponible" disabled selected hidden>
            Visible en la web ?
          </option>
          <option value="true">Visible en la web</option>
          <option value="false">No visible en la web</option>
        </select>
        <input
          placeholder="image"
          name="image"
          type="file"
          required
          onChange={param.newImageHandler}
        />
        <Button as="input" type="submit" value="Crear producto!" />
      </form>
    </div>
  );
};

export default AddProductForm;
