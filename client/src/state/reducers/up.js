const initialstate = "fname";

const changeTheNumber = (state = initialstate, action) => {
  switch (action.type) {
    case "INCREMENT":
      return action.payload;
    default:
      return state;
  }
};
export default changeTheNumber;
