import React from "react";
import Item from "./Item/Item";
import Proximamente from "../../Proximamente/Proximamente";
import './ItemList.css'

const ItemList = ({ productList }) => {
  return (
    <>
      {productList.length === 0 ? (
        <div className="d-flex justify-content-center">
          <Proximamente />
        </div>
      ) : (
        <div
        className="itemList"
        >
          {productList.map((product) => {
            return <Item product={product} key={product.id} />;
          })}
        </div>
      )}
    </>
  );
};

export default ItemList;
