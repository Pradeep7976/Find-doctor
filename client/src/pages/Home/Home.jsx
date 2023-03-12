import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const port = "https://famous-puce-raven.cyclic.app";
  let navigate = useNavigate();
  function nav() {
    navigate("/doctors");
  }
  function addnav() {
    navigate("/docadd");
  }

  useEffect(() => {
    axios
      .get(port + "/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        if (!response.data.auth) {
          navigate("/login");
        }
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          "url(https://ik.imagekit.io/aj4rz7nxsa/DOC/tech46-3_eUOsnRzw4.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1665507293871)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Heading color={"white"}>MED WAY!</Heading>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "xl", md: "2xl" })}
            >
              {/* Lorem ipsum dolor sit amet consectetur adipiscing elit sed */}
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={nav}
              >
                Find doctors
              </Button>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
                onClick={addnav}
              >
                Register doctor
              </Button>
              {/* <Button
              bg={"whiteAlpha.300"}
              rounded={"full"}
              color={"white"}
              _hover={{ bg: "whiteAlpha.500" }}
            >
              Show me more
            </Button> */}
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </div>
  );
}
export default Home;
