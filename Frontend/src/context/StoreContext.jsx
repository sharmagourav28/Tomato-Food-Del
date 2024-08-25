import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcardItems] = useState({});
  const url = "https://tomato-food-del-black.vercel.app/";
  const [token, setToken] = useState("");
  const [food_list, setfood_list] = useState([]); //backend se frontend data dekhna
  const addTocart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcardItems((prev) => ({ ...prev, [itemId]: 1 }));
      // kabhi add to cart m kuch nhi h to vo 1 kardega
    } else {
      setcardItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      //  kabhi kuch select karka rakha h to increase kardega
    }

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCard = async (itemId) => {
    setcardItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //  remove krdega kabhi minus p click kra ho to
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalamount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalamount += itemInfo.price * cartItems[item];
      }
    }
    return totalamount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setfood_list(response.data.data);
  };
  // backend se frontend p data dekhna

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setcardItems(response.data.cartData);
  };
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextvalue = {
    food_list,
    cartItems,
    setcardItems,
    addTocart,
    removeFromCard,
    url,
    getTotalCartAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
