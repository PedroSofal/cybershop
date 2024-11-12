/* eslint-disable no-unused-vars */
function useGetEssentialOrderEntries(orderInfos) {
  let personalEntries = [], addressEntries = [], cardEntries = [];

  if (orderInfos.personalData) {
    const { id, gender, ...personalEssentials } = orderInfos.personalData;
    personalEntries = Object.entries(personalEssentials);
  }

  if (orderInfos.addressData) {
    const { id, nickname, ...addressEssentials } = orderInfos.addressData;
    addressEntries = Object.entries(addressEssentials);
  }

  if (orderInfos.cardData) {
    const { id, nickname, ...cardEssentials } = orderInfos.cardData;
    cardEntries = Object.entries(cardEssentials);
  }
  
  return { personalEntries, addressEntries, cardEntries };
}

export default useGetEssentialOrderEntries;