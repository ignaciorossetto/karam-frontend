import React, { createContext, useEffect, useState } from "react";
// import io from 'socket.io-client'

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [freeShipping, setFreeShipping] = useState(20000);
  const [clientInfo, setClientInfo] = useState({});
  const [deleteItemInfo, setDeleteItemInfo] = useState();
  const [deleteAllItems, setDeleteAllItems] = useState([]);
  const [deleteAllCartBool, setDeleteAllCartBool] = useState(false);

  // const socket = io.connect('http://localhost:5000')

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
    updateCartQuantity();
    updateCartTotal();
  }, [cart]);

  const isInCart = (productID) => cart.some(({ id }) => id === productID);

  const addToCart = (productID, name, price, image, amount) => {
    if (isInCart(productID)) {
      const itemIndex = cart.findIndex((product) => product.id === productID);

      cart[itemIndex].quantity += amount;
      const cartWithOutAboveItem = cart.filter(
        (product) => product.id !== productID
      );
      return setCart([...cartWithOutAboveItem, cart[itemIndex]]);
    } else {
      return setCart([
        ...cart,
        {
          id: productID,
          name: name,
          price: price,
          quantity: amount,
          image: image,
        },
      ]);
    }
  };

  const deleteItemAll = (id) => {
    // looks for an item in the cart an completely remove it
    const newCart = cart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  const deleteItem = (productID) => {
    // looks for an item in the cart, if it is. adds one in stock again and remove the item from the cart.
    const prodIndex = cart.findIndex(({ id }) => {
      return id === productID;
    });
    if (prodIndex === -1) {
      return;
    }
    if (cart[prodIndex].quantity === 1) {
      setCart(cart.filter((product) => product.id !== productID));
      setDeleteItemInfo(productID);
      return;
    } else {
      const incompleteCart = cart.filter((product) => product.id !== productID);
      cart[prodIndex].quantity--;

      setCart([...incompleteCart, cart[prodIndex]]);
      setDeleteItemInfo(productID);
      return;
    }
  };

  const deleteAllCart = () => {
    //method to delete cart after a sale...
    setCart([]);
  };

  const deleteCart = () => {
    //method to delete cart from CartModal. it adds to stock the quantity that was at the cart for that item.
    setDeleteAllCartBool(true);
    setDeleteAllItems([...cart]);
    setCart([]);
  };
  const deleteClientInfo = () => {
    setClientInfo([]);
  };

  const updateCartQuantity = () => {
    const initialValue = 0;
    return setCartQuantity(
      cart.reduce((prevval, { quantity }) => prevval + quantity, initialValue)
    );
  };
  const updateCartTotal = () => {
    const initialValue = 0;

    return setCartTotal(
      cart.reduce(
        (prevval, { quantity, price }) => prevval + quantity * price,
        initialValue
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        setCart,
        cartQuantity,
        deleteCart,
        deleteItem,
        deleteItemAll,
        cartTotal,
        freeShipping,
        setClientInfo,
        clientInfo,
        deleteClientInfo,
        deleteItemInfo,
        setDeleteItemInfo,
        deleteAllItems,
        setDeleteAllItems,
        setDeleteAllCartBool,
        deleteAllCartBool,
        deleteAllCart,
        isInCart,
        setFreeShipping
        // socket
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
