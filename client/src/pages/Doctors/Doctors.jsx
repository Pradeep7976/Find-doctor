import {
  SimpleGrid,
  Text,
  Center,
  HStack,
  Input,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Flex,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { BiFilter } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./Doctors.css";
import Docc from "../../components/Docc/Docc";
import Nav from "../../components/Navbar";

const url1 = "http://localhost:7000/doctors";
const port = "http://localhost:7000";

function Doctors() {
  const [docdatai, setdocdatai] = useState([]);
  const [filter, setfilter] = useState("Filter");
  const [filterval, setfilterval] = useState("");
  const [area, setarea] = useState("");
  const [spec, setspec] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get(port + "/isUserAuth", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((response) => {
        console.log(localStorage.getItem("token"));
        if (!response.data.auth) {
          navigate("/login");
        }
      });
    axios
      .get(url1)
      .then((Response) => {
        console.log(Response.data);
        let data = Response.data;
        if (data.length === 0) {
          alert("No Doctors Found");
        } else {
          setdocdatai(data);
        }
      })
      .catch((err) => {
        console.log("error fetching data");
      });
    console.log("fetched");
    // eslint-disable-next-line
  }, []);

  //search

  // const [search, setsearch] = useState("");
  function searchi() {
    // const searcc = search.charAt(0).toUpperCase() + search.slice(1);
    if (area === "" || spec === "") {
      alert("Enter area and specialization first");
      return;
    }
    axios.post(port + "/search/" + area + "/" + spec).then((resp) => {
      if (resp.data.length === 0) {
        alert("NO doctors found");
      }
      setdocdatai(resp.data);
    });
  }
  function filteri() {
    if (area === "" || spec === "") {
      alert("Enter City and specialization first");
      return;
    }
    if (filter === "" || filterval === "") {
      console.log(filter + " " + filterval);
      alert("apply filter first");
    }
    axios
      .post(
        port + "/filter/" + area + "/" + spec + "/" + filter + "/" + filterval
      )
      .then((resp) => {
        if (resp.data.length === 0) {
          alert("NO doctors found");
        }
        setdocdatai(resp.data);
      });
  }
  return (
    <div className="doctors">
      <Nav />
      <Center>
        <Text fontSize={40} fontFamily={"Josefin Sans"}>
          Doctors
        </Text>{" "}
      </Center>
      <Flex>
        <HStack marginLeft={"auto"} marginRight={"auto"}>
          {/* <FormLabel>Location</FormLabel> */}

          <Input
            width={180}
            height={35}
            placeholder="City"
            onChange={(e) => {
              setarea(e.target.value);
            }}
          />
          <Input
            width={180}
            height={35}
            placeholder="Specialization"
            onChange={(e) => {
              setspec(e.target.value);
            }}
          />
          <Button
            className="sbtn"
            // maxH={"3rem"}
            fontFamily={"mono"}
            fontWeight={"medium"}
            onClick={searchi}
          >
            Search
          </Button>
        </HStack>
      </Flex>
      <br />
      <Flex float={"right"} marginRight={6}>
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<BiFilter />}
              marginRight={2}
              variant="solid"
              backgroundColor={"#c7d4d1"}
              color={"black"}
            >
              {filter}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setfilter("Area");
                }}
              >
                Area
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setfilter("gender");
                }}
              >
                Gender
              </MenuItem>
            </MenuList>
          </Menu>
          <Input
            width={180}
            height={35}
            placeholder="Filter value"
            className="search"
            onChange={(e) => {
              setfilterval(e.target.value);
            }}
          />
          <Button
            // className="sbtn"

            fontFamily={"mono"}
            fontWeight={"medium"}
            onClick={filteri}
          >
            Apply
          </Button>
        </Box>
      </Flex>
      <br />
      <br />
      <Flex float={"right"} marginRight={6}>
        {/* <Box paddingTop={19} paddingRight={10} > */}
        <Button
          leftIcon={
            <GrAddCircle
              size={28}
              onClick={() => {
                navigate("/prescadd");
              }}
            />
          }
          color={"white"}
          onClick={() => {
            navigate("/docadd");
          }}
        ></Button>

        {/* </Box> */}
      </Flex>

      <br />
      <br />
      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={"20"}
        mt={4}
        mx={10}
        className="doctors"
      >
        {docdatai.map((cardinfo) => {
          return (
            <Docc
              name={cardinfo.fname}
              username={cardinfo.username}
              specialization={cardinfo.specialization}
              description={cardinfo.description}
              date={cardinfo.yearofexperience + " years"}
              did={cardinfo.did}
              rating={cardinfo.rating}
            />
          );
        })}
      </SimpleGrid>
    </div>
  );
}

export default Doctors;
