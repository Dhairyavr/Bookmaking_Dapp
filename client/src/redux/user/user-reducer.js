let initialstate = {
  userdata: {},
};

const userReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        userdata: action.payload,
      };

    case "TOGGLE_LOG_IN":
      return {
        ...state,
        loggedIn: action.payload,
      };

    case "LOG_OUT":
      localStorage.removeItem("persist:user1");
      return {
        ...state,
        userdata: {},
      };

    default:
      return state;
  }
};
export default userReducer;
