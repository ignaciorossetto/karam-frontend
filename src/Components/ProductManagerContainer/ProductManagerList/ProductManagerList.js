import React from "react";
import ProductManagerDetail from "./ProductManagerDetail/ProductManagerDetail";
import "./ProductManagerList.css";

const ProductManagerList = ({ productList }) => {
  return (
    <div className="itemList">
      {productList.length === 0 ? (
        <div className="d-flex justify-content-center">
          <h2>No hay productos en esta categoria</h2>
        </div>
      ) : (
        productList.map((item) => {
          return <ProductManagerDetail item={item} key={item.id} />;
        })
      )}
    </div>
  );
};

export default ProductManagerList;