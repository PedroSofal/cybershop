import { createContext, useState } from "react";

const ShippingContext = createContext({
  shippingInfo: {},
  setShippingInfo: () => {},
});

export function ShippingProvider({ children }) {
  const [ shippingInfo, setShippingInfo ] = useState({});

  return(
    <ShippingContext.Provider value={{ shippingInfo, setShippingInfo }}>
      {children}
    </ShippingContext.Provider>
  )
}

export default ShippingContext;