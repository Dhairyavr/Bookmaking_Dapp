export const setcurrentuser = (userdata) => ({
  type: "SET_USER",
  payload: userdata,
});

export const logout = () => ({ type: "LOG_OUT" });
