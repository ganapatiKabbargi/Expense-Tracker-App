import { authActions } from "./authSlice";
import { themeActions } from "./themeSlice";

export const fetchDetails = (token) => {
  return async (dispatch) => {
    try {
      dispatch(themeActions.showLoader());
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCdAt2TovMTe4PkgyCuLYXvHQK7AgVi-YI",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.users[0].emailVerified) {
          localStorage.setItem("verified", true);
        }
        dispatch(authActions.setUser(data.users[0]));
        dispatch(themeActions.hideLoader());
      } else {
        let errorMesssage = "Profile update Failed";
        throw new Error(errorMesssage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
