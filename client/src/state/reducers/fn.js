const initialstate = "Fname";
const changefname = (state = initialstate, action) => {
  switch (action.type) {
    case "seting":
      return action.payload;
    default:
      return state;
  }
};
export default changefname;
