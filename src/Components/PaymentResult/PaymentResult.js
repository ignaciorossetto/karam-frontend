import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Success from "./Success/Success";
import InProcess from "./InProcess/InProcess";
import Failure from "./Failure/Failure";
import StockFailed from "./Failure/StockFailed";
import TransfInProcess from "./TransfInProcess/TransfInProcess";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [saleInfo, setSaleInfo] = useState({});

  return (
    <div className="d-flex flex-column align-items-center">
      {searchParams.get("status") === "approved" ? (
        <Success info={saleInfo} />
      ) : searchParams.get("status") === "in_process" ? (
        <InProcess info={saleInfo} />
      ) : searchParams.get("status") === "failed" ? (
        <Failure info={saleInfo} />
      ) : searchParams.get("status") === "stock_failed" ? (
        <StockFailed />
      ) : (
        <TransfInProcess />
      )}
    </div>
  );
};

export default PaymentSuccess;
