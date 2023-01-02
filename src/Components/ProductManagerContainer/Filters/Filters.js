import React, {useContext} from "react";
import Button from "react-bootstrap/esm/Button";
import { Link  } from "react-router-dom";
import "./Filter.css";
import axios from 'axios'
import Swal from 'sweetalert2'
import {CartContext} from '../../../Context/CartContext/CartContext'


const Filters = (param) => {

  const {setFreeShipping} = useContext(CartContext)
  
  const handleIncrAllPrices = () => {
  
    Swal.fire({
      title: 'Indica el porcentaje (1-100)',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (perc) => {
        const obj = {percentage: perc}
        return axios.put('http://127.0.0.1:5000/api/products', obj)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: result.value.data
        })
        param.setUpdatePricesBool(!param.updatePricesBool)
        
      }
    })
  }
  const handleEnvioGratis = () => {
  
    Swal.fire({
      title: 'Indica el nuevo valor del envio gratis',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (amount) => {
        return setFreeShipping(Number(amount))
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  return (
    <div className="filterContainer_">
      <div>
        <Link to="/admin/addproduct">
          <Button variant="success">+ producto!</Button>
        </Link>
      </div>
      <div>
      <Button onClick={handleIncrAllPrices}> Subir todos los $ </Button>
      </div>
      <div>
      <Button onClick={handleEnvioGratis}> Envio gratis </Button>
      </div>
      <div className="categoryFilterContainer">
        <h4 style={{ marginRight: "5px" }}>Categoria</h4>
        <select onChange={param.selectHandler} id="Filter">
          <option value="Todos">Todos</option>
          <option value="Almohadon">Almohadon</option>
          <option value="Bolso">Bolso</option>
          <option value="Ropa de cama">Ropa de cama</option>
        </select>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <h4 style={{ marginRight: "5px" }}>Otros filtros</h4>
        <select
          onChange={param.selecOthertHandler}
          id="otherFilter"
          className="filterSelect"
        >
          <option value="Todos">Todos</option>
          <option>Stock 0</option>
          <option>Visible</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
