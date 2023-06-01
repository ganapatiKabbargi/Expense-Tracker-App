import { expenseActions } from "./expenseSlice";
import { themeActions } from "./themeSlice";

export const fetchExpenseFromFirebase = (email) => {
  console.log(email);
  return async (dispatch) => {
    try {
      // dispatch(themeActions.showLoader());
      const response = await fetch(
        `https://expense-tracker-app-a3c25-default-rtdb.firebaseio.com/${email}.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
      const fetchedExpenses = [];
      for (let key in data) {
        fetchedExpenses.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
      }
      dispatch(expenseActions.addExpense(fetchedExpenses));
      // dispatch(themeActions.hideLoader());
    } catch (err) {
      alert(err.message);
    }
  };
};

export const addExpenseToFirebase = (expense, email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://expense-tracker-app-a3c25-default-rtdb.firebaseio.com/${email}.json`,
        {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        dispatch(fetchExpenseFromFirebase(email));
      }
      const data = await response.json();
    } catch (err) {
      alert(err);
    }
  };
};

export const removeExpenseFromFirebase = (id, email) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://expense-tracker-app-a3c25-default-rtdb.firebaseio.com/${email}/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        dispatch(fetchExpenseFromFirebase(email));
      }
      const data = response.json();
      console.log("expense deleted successfully");
    } catch (err) {
      alert(err.message);
    }
  };
};

export const editExpenseInFirebase = (expense, email, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://expense-tracker-app-a3c25-default-rtdb.firebaseio.com/${email}/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        dispatch(fetchExpenseFromFirebase(email));
        dispatch(expenseActions.setExpense(""));
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const fetchExpenseToBeEdited = (email, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://expense-tracker-app-a3c25-default-rtdb.firebaseio.com/${email}/${id}.json`
      );
      const data = await response.json();
      console.log(data);
      dispatch(expenseActions.setExpense(data));
    } catch (e) {
      alert(e.message);
    }
  };
};
