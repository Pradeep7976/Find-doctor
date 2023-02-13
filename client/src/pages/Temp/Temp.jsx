// eslint-disable-next-line
import { Button, Center, Box, VStack, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incNumber, setfname, lname } from "../../state/action-creator";

const Temp = () => {
  const [inp, setinp] = useState("");
  const [num, setnum] = useState(1);
  const [arry, setarray] = useState([]);
  const [time, settime] = useState("");
  const [address, setadd] = useState("");

  //////////////////////
  const [subq, setsubq] = useState(0);
  const [active, setactive] = useState(false);
  const [que, setque] = useState(1);
  const [myArr, setMyArr] = useState([]);
  function getqinp() {
    const dat = {
      time: time,
      address: address,
    };
    arry.push(dat);
    console.log(arry);
    settime("");
    setadd("");
    setque(que + 1);
    setactive(true);
    for (let index = 0; index < subq; index++) {
      // setMyArr((current) => [...current, 2]);
      myArr.push(2);
    }
    console.log("Pushed " + myArr.length);
  }
  ///////////////////
  //
  const mystate = useSelector((state) => {
    return state.changeTheNumber;
  });
  const dispatch = useDispatch();
  const clicki = () => {
    dispatch(incNumber());
  };
  //

  const Fname = useSelector((state) => {
    return state.changefname;
  });

  const Lname = useSelector((state) => {
    return state.changeLname;
  });
  return (
    <div>
      <Center>
        <VStack>
          <Box paddingTop={10} paddingBottom={10}>
            {/* {inpi} */}
          </Box>
          <Box paddingTop={10} paddingBottom={10}>
            <Input
              onChange={(e) => {
                setinp(e.target.value);
                dispatch(incNumber(e.target.value));
                dispatch(setfname(e.target.value));
                dispatch(lname(e.target.value));
              }}
            />
          </Box>

          <Input value={Lname} />
          <Button onClick={clicki}>Click me</Button>
          <Box>
            {myArr.map((ele) => {
              return (
                <>
                  <Input />
                </>
              );
            })}
            <Input
              maxW={"10rem"}
              marginLeft={"2rem"}
              onChange={(e) => {
                settime(e.target.value);
              }}
              type={"text"}
              value={time}
            />
            <Input
              maxW={"10rem"}
              marginLeft={"2rem"}
              onChange={(e) => {
                setadd(e.target.value);
              }}
              type={"text"}
              value={address}
            />
            <Button
              marginLeft={"1rem"}
              backgroundColor={"aqua"}
              onClick={getqinp}
            >
              Add
            </Button>
          </Box>
        </VStack>
      </Center>
    </div>
  );
};
export default Temp;
