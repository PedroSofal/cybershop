import { createContext, useState } from "react";

const CheckoutContext = createContext({
  progress: '',
  next: () => {},
  back: () => {},
  loadedOrderId: '',
  setLoadedOrderId: () => {},
  getOrderInfo: () => {},
  getAllOrderInfos: () => {},
  setOrderInfo: () => {},
  removeOrderInfo: () => {}
});

export function CheckoutProvider({ children }) {
  const [ progress, setProgress ] = useState(1);
  const [ orderInfos, setOrderInfos ] = useState({});

  function getOrderInfo(key) {
    return orderInfos[key] || null;
  }

  function getAllOrderInfos() {
    return orderInfos;
  }

  function setOrderInfo(key, value) {
    setOrderInfos(prev => ({ ...prev, [key]: value }));
  }

  function removeOrderInfo(key) {
    if (!getOrderInfo(key)) return null;
    // eslint-disable-next-line no-unused-vars
    const { [key]:itemToBeRemoved, ...rest } = orderInfos;
    setOrderInfos({ ...rest });
  }

  function back() {
    setProgress(p => p - 1);
  }

  function next() {
    setProgress(p => p + 1);
  }

  return(
    <CheckoutContext.Provider value={{
      progress,
      next,
      back,
      getOrderInfo,
      getAllOrderInfos,
      setOrderInfo,
      removeOrderInfo
    }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutContext;