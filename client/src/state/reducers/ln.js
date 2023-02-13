const initialstate = "Lname";

const changeLname = (state = initialstate, action) => {
  switch (action.type) {
    case "SETTINGl":
      return action.payload;
    default: 
      return state;
  }
};
export default changeLname;
