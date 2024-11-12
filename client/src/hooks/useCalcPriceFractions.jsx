import { useContext } from "react";
import ShippingContext from "@contexts/ShippingContext";

function useCalcPriceFractions(products, deliveryMethod, paymentMethod, promoCode) {
  const { shippingInfo } = useContext(ShippingContext);

  const totalQuantity = calculateTotalQuantity();
  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const freightMultiplier = calculateFreightMultiplier();
  const freight = calculateFreight();
  const pixDiscount = calculatePixDiscount();
  const total = calculateTotal();

  function calculateTotalQuantity() {
    return products.reduce((acc, product) => acc + product.quantity, 0);
  }

  function calculateSubtotal() {
    return products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  }

  function calculateDiscount() {
    return promoCode ? subtotal * 4 * promoCode.rate : 0;
  }

  function calculateFreightMultiplier() {
    if (!shippingInfo.price) return 1;
    return deliveryMethod === 'pick-up' ? 1 : Math.ceil(totalQuantity / 3) || 1;
  }

  function calculateFreight() {
    if (!shippingInfo.price) return 0;
    return deliveryMethod === 'pick-up' ? 0 : shippingInfo.price * freightMultiplier;
  }

  function calculatePixDiscount() {
    return paymentMethod === 'pix' ? (subtotal * 4 + freight - discount) * 0.05 : null;
  }

  function calculateTotal() {
    return subtotal * 4 + freight - discount - pixDiscount;
  }

  return({ totalQuantity, subtotal, discount, freight, pixDiscount, total });
}

export default useCalcPriceFractions;