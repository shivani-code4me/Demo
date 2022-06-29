import React, { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import { AppContext } from "../context/AppContext";
const ExpenseList = () => {
  const { expenses } = useContext(AppContext);
// MAP map() function is used to iterate over an array and manipulate or change data items
  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          name={expense.name}
          cost={expense.cost}
        />
      ))}
    </ul>
  );
};
export default ExpenseList;
