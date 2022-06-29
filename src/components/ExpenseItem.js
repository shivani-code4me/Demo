import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { TiDelete } from "react-icons/ti";
import { FiEdit2 } from "react-icons/fi";
import "./Expense.css";
import api from "../api/Expenses";

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);
  const [cost, setCost] = useState(props.cost);

  const handleDeleteExpense = async () => {
    //   this will delete the expense from the json file
    await api.delete(`/expenses/${props.id}`);

    dispatch({
      type: "Delete_Expense",
      payload: props.id,
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {props.name}

      <div
        style={{
          position: "relative",
        }}
      >
        <span className="badge badge-primary badge-pill mr-3" id="rup">
          Rs{props.cost}
        </span>
        <span style={{ marginLeft: "8px" }}>
          <TiDelete
            size="1.5em"
            onClick={handleDeleteExpense}
            style={{ cursor: "pointer" }}
          ></TiDelete>
        </span>
      </div>
    </li>
  );
};
export default ExpenseItem;
