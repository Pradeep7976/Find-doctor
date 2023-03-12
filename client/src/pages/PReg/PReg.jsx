import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Box,
  Textarea,
} from "@chakra-ui/react";
import "./PReg.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DocForm() {
  const [usernamed, setusername] = useState("");
  const [emaild, setemail] = useState("");
  const [passwordd, setpassword] = useState("");
  const [date, setdate] = useState("");
  const [address, setaddressd] = useState("");
  // eslint-disable-next-line
  const [check, setcheck] = useState(false);

  let navigate = useNavigate();

  async function clicki() {
    console.log("clicked");
    if (
      usernamed === "" ||
      emaild === "" ||
      passwordd === "" ||
      date === "" ||
      address === ""
    ) {
      alert("all the form elements should be filled");
    } else {
      const dat = {
        username: usernamed,
        password: passwordd,
        email: emaild,
        address: address,
        date: date,
      };
      axios
        .post("https://famous-puce-raven.cyclic.app/reg", dat)
        .then((resp) => {
          if (resp.data.log === false) {
            alert("Email already present");
            setcheck(true);
            return;
          } else {
            navigate("/login");
          }
        });
    }
  }

  return (
    <Box width={"100%"} height={"100%"} n>
      <Box classname="cardi">
        <Flex
          className="docreg"
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            className="card1 scrollable-div"
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Sign UP
            </Heading>
            <FormControl id="userName" isRequired>
              <FormLabel>User name</FormLabel>
              <Input
                placeholder="UserName"
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                maxLength={35}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="password"
                _placeholder={{ color: "gray.500" }}
                type="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                maxLength={10}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                maxLength={55}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                placeholder="Address"
                _placeholder={{ color: "gray.500" }}
                type="text"
                className="des1"
                onChange={(e) => {
                  setaddressd(e.target.value);
                }}
                maxLength={150}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>DOB</FormLabel>
              <Input
                placeholder="DD/MM/YYYY"
                _placeholder={{ color: "gray.500" }}
                type="date"
                onChange={(e) => {
                  console.log(e.target.value);
                  setdate(e.target.value);
                }}
              />
            </FormControl>

            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={clicki}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}

export default DocForm;
