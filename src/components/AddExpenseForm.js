import React, { useState, useContext } from "react";
import { AppContext, AppProvider } from "../context/AppContext";
import { v4 as uuidv4 } from "uuid";
import api from "../api/Expenses";

const AddExpenseForm = () => {
  const { dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const expense = {
      id: uuidv4(),
      name: name,
      cost: parseInt(cost),
    };

    const response = await api.post("/expenses", expense);

    dispatch({
      type: "Add_Expense",
      payload: expense,
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label for="name">Name</label>
          <input
            required="required"
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>
        </div>
        <div className="col-sm">
          <label for="cost">Cost</label>
          <input
            required="required"
            type="number"
            className="form-control"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            id="cost"
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
export default AddExpenseForm;
