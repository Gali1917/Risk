import { userActions } from "../actions/userActions";

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

export const initialState = {
  isLoading: false,
  // isLoggedIn: Boolean(token),
  user: user || null,
  token: token || "",
  errorMessage: "",
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActions.USER_SIGNUP:
      return {
        ...state,
        isLoading: true,
      };
    case userActions.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        isLoggedIn: true,
        errorMessage: null,
      };
    case userActions.USER_SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case userActions.USER_SIGNIN:
      return {
        ...state,
        isLoading: true,
      };
    case userActions.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: payload.token,
        user: payload.user,
        isLoggedIn: true,
        errorMessage: null,
      };
    case userActions.USER_SIGNIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
