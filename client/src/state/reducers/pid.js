const initialstate = 1;

const changepid = (state = initialstate, action) => {
  switch (action.type) {
    case "settingpid":
      return action.payload;
    default:
      return state;
  }
};
export default changepid;
