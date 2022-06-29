import api from "../api/Expenses";
import { useEffect } from "react";
import { createContext, useReducer } from "react";
//useReducer hook which will hold our state, and allow us to update the state via dispatch
//The reducer is in charge of creating the new global state object, based on an action type and a payload.
const AppReducer = (state, action) => {
  switch (action.type) {
    case "Add_Expense":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case "Delete_Expense":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const initialState = {
  budget: 2000,
  expenses: [
    // { id: 12, name: "Shopping", cost: 40 },
    // { id: 13, name: "Holiday", cost: 400 },
  ],
};

export const AppContext = createContext(); //Context object is created here

export const AppProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //   will retrieve all expenses from the json file
  const retrieveExpenses = async () => {
    const response = await api.get("/expenses");
    return response.data;
  };

  //   this will run after the component is rendered and then the expenses will be shown
  useEffect(() => {
    const getAllExpenses = async () => {
      const allExpenses = await retrieveExpenses();
      //   console.log(allExpenses);

      if (allExpenses) {
        let i = allExpenses.length;
        // console.log(i);
        let j = 0;
        while (j !== i) {
          console.log("run: " + i);
          dispatch({
            type: "Add_Expense",
            payload: allExpenses[j],
          });
          j++;
        }
      }
    };
    getAllExpenses();
  }, []);

  return (
    <AppContext.Provider
      value={{
        budget: state.budget,
        expenses: state.expenses,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

// We're returning AppContext.Provider. This has a value prop which contains the data which we
// allow our components to see and have access to, as well as the dispatch function that lets us update
// the state by dispatching actions
