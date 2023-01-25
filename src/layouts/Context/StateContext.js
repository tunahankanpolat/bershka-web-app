import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [logedUser, setLogedUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [searchItem, setSearchItem] = useState([]);
  const [showNavbar, setShowNavbar] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [lastUrl, setLastUrl] = useState();
  const [signUp, setSignUp] = useState(false);
  const [notSignUp, setNotSignUp] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(true);

  const onAdd = (product, quantity, size) => {
    console.log("üst console");
    console.log(product);

    const checkProductInCart = cartItems?.find(
      (item) => item.id === product.id && item.size === size
    );
    settotalPrice((totalPrice) => totalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (
          cartProduct.id === product.id &&
          cartProduct.size === product.size
        ) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
            size: size,
          };
        }

      });
      console.log(cartItems);
      console.log("if içinde");

      setCartItems(updatedCartItems);
      console.log(cartItems);
    } else {
      console.log("elsenin içinde");
      product.quantity = quantity;
      product.size = size;
      setCartItems([...cartItems, { ...product }]);
      console.log(cartItems);
    }
  };

  const [showContentSlider, setshowContentSlider] = useState(true);
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showSearch,
        setShowSearch,
        showUser,
        setShowUser,
        showSignUp,setTotalQuantities,
        setShowSignUp,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        showContentSlider,
        setshowContentSlider,
        onAdd,
        lastUrl,
        setLastUrl,
        signUp,
        setSignUp,
        notSignUp,
        setNotSignUp,
        isLogin,
        setisLogin,
        isActive,
        setisActive,
        showUpdate,
        setShowUpdate,
        forgotPassword,
        setForgotPassword,
        logedUser,
        setLogedUser,
        userId,
        setUserId,
        searchItem,
        setSearchItem,setCartItems,settotalPrice,showNavbar, setShowNavbar,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
