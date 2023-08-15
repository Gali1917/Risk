import axios from "axios";

import { apiURL } from "./apiConfig";

export const registerUserRequest = async (user) => {
  const result = await axios.post(`${apiURL}/api/auth/signup`, user);
  return result;
};

export const loginUserRequest = async (user) => {
  const result = await axios.post(`${apiURL}/api/auth/signin`, user);
  return result;
}

export const getProfileRequest = async (token) => {
  return await axios.get(`${apiURL}/api/auth/profile`, {
    headers: {
      Authorization: token,
    },
  });
};