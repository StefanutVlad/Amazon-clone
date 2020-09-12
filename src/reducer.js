export const initialState = {
  basket: [],
};

const reducer = (state, action) => {
    console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    default:
      return state;
  }
};

export const getBasketTotal = (basket) => 
    basket?.reduce((totalAmount,currentItem) => currentItem.price+totalAmount,0);

export default reducer;
