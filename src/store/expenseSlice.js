import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  showForm: false,
  id: "",
  expense: "",
};
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...action.payload];
      console.log(state.expenses);
    },
    showEditForm(state, action) {
      state.showForm = true;
    },
    hideEditForm(state) {
      state.showForm = false;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setExpense(state, action) {
      state.expense = action.payload;
    },
  },
});

export default expenseSlice;
export const expenseActions = expenseSlice.actions;
