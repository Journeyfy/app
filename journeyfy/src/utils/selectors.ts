import { User } from "../models/user";

export const userInfoSelector = () => {
  const rawUser = localStorage.getItem("user");
  return rawUser ? (JSON.parse(rawUser) as User) : null;
};
