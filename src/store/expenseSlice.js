import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenses: [],
  showForm: false,
  id: "",
  premium: false,
};
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expenses = [...action.payload];
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
    premium(state) {
      state.premium = true;
    },
    nonPrime(state) {
      state.premium = false;
    },
  },
});

export default expenseSlice;
export const expenseActions = expenseSlice.actions;
