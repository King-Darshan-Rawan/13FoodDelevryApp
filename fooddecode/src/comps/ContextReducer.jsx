// ContextReducer.js
import { createContext, useContext, useReducer } from "react";

const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          price: action.price,
          size: action.size,
          qty: action.qty,
          img: action.img,
        },
      ];

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.id && item.size === action.size
          ? { ...item, qty: action.qty, price: action.price }
          : item
      );
    }
    //       {
    //       let arr = [...state]
    //       arr.find((food,index)=>{
    //         if (food.id === action.id){
    //           console.log(food.qty, parseInt(action.qty), action.price + food.price);
    //           arr[index] = {...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price}
    //         }
    //       })
    // }
    case "DROP":
      let emptyArry = [];
      return emptyArry;
      
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <cartDispatchContext.Provider value={dispatch}>
      <cartStateContext.Provider value={state}>
        {children}
      </cartStateContext.Provider>
    </cartDispatchContext.Provider>
  );
};

export const useIncludeCart = () => useContext(cartStateContext);
export const useDispatchCart = () => useContext(cartDispatchContext);
