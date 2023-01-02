import React, { useEffect, useState } from "react";
import ProductManagerList from "./ProductManagerList/ProductManagerList";
import Filters from "./Filters/Filters";
import './ProductManagerContainer.css'
import SpinnerComponent from '../Spinner/Spinner'

const DeleteProduct = () => {
  const [productList, setProductList] = useState([]);
  const [itemListFilter, setItemListFilter] = useState("Todos");
  const [itemOtrosFilter, setItemOtrosFilter] = useState("Todos");
  const [updatePricesBool, setUpdatePricesBool] = useState(true);
  const [spinnerBool, setSpinnerBool] = useState(true);

  const fetchProducts = async () => {
    let response;
    if (itemListFilter === "Todos") {
      response = await fetch(`http://127.0.0.1:5000/api/products`);
    } else {
      response = await fetch(
        `http://127.0.0.1:5000/api/products?category=${itemListFilter.toLowerCase()}`
      );
    }
    const data = await response.json();
    setProductList(data.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    setSpinnerBool(true)
    fetchProducts();
    document.getElementById("otherFilter").value =
      document.getElementById("otherFilter")[0].value;
    setItemOtrosFilter(document.getElementById("otherFilter")[0].value);
    setSpinnerBool(false)
  }, [itemListFilter, updatePricesBool]);

  useEffect(() => {
    if (itemOtrosFilter === "Todos") {
      fetchProducts();
    } else if (itemOtrosFilter === "Visible") {
      const data = productList.filter((prod) => prod.disponible === false);
      setProductList(data.sort((a, b) => a.id - b.id));
    } else {
      const data = productList.filter((prod) => Number(prod.stock) === 0);
      setProductList(data.sort((a, b) => a.id - b.id));
    }
  }, [itemOtrosFilter]);

  const selectHandler = (e) => {
    setItemListFilter(e.target.value);
  };
  const selecOthertHandler = (e) => {
    setItemOtrosFilter(e.target.value);
  };

  return (
    <div className="ProductManagerContainer">

      <div className="filterContaier" >
        <Filters
          selectHandler={selectHandler}
          selecOthertHandler={selecOthertHandler}
          setUpdatePricesBool={setUpdatePricesBool}
          updatePricesBool={updatePricesBool}
        />
      </div>
      {spinnerBool ? <SpinnerComponent/> : <ProductManagerList productList={productList} />}
    </div>
  );
};

export default DeleteProduct;
