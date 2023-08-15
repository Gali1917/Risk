import { createContext, useContext, useReducer } from "react";
import { getProfileRequest, registerUserRequest } from "../../api/userApi";
import { userReducer, initialState } from "../reducer/userReducer";
import { userActions } from "../actions/userActions";

export const userContext = createContext(initialState);

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) throw new Error("Must be in an AuthProvider");
  return context;
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const registerUser = async (user) => {
    dispatch({ type: userActions.USER_SIGNUP });
    try {
      const res = await registerUserRequest(user);
      const { token } = res.data;

      localStorage.setItem("token", token);
      if (token) {
        const resUser = await getProfileRequest(token);
        localStorage.setItem("user", JSON.stringify(resUser.data));
        dispatch({
          type: userActions.USER_SIGNUP_SUCCESS,
          payload: {
            token,
            user: resUser.data,
          },
        });
        return resUser.data;
      }
    } catch (error) {
      if (error.response.data) {
        dispatch({
          type: userActions.USER_SIGNUP_ERROR,
          payload: error.response.data.message,
        });
      }
    }
  };

  return (
    <userContext.Provider
      value={{
        ...state,
        registerUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
