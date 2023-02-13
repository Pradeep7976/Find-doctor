import {
  SimpleGrid,
  Text,
  Center,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { BiSearchAlt2 } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import axios from "axios";

// import "./Doctors.css";
import Docc from "../../components/Docc/Docc";

const url1 = "http://localhost:7000/doctors";
const port = "http://localhost:7000";
const port1 = "http://localhost:7000/details/2";

function Doctors() {
  const [docdatai, setdocdatai] = useState([]);
  let navigate = useNavigate();
  const [doctor, setdoctor] = useState([]);
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
    axios
      .get(port1)
      .then((Response) => {
        console.log(Response.data);
        let data = Response.data;
        if (data.length === 0) {
          alert("No Doctors Found");
        } else {
          setdoctor(data);
        }
      })
      .catch((err) => {
        console.log("error fetching data");
      });
    console.log("fetched doctor");
  }, []);

  //search

  const [search, setsearch] = useState("");
  function searchi() {
    const searcc = search.charAt(0).toUpperCase() + search.slice(1);
    const dati = {
      username: searcc,
    };
    console.log(dati);
    axios
      .post(port + "/doctors/search", dati)
      .then((Response) => {
        console.log(Response.data);

        if (!Response.data) {
          alert("No Doctors Found");
        } else {
          setdocdatai(Response.data);
        }
      })
      .catch((err) => {
        console.log("error searching  data");
      });
  }
  return (
    <div className="doctors">
      <Center>
        <Text fontSize={40} fontFamily={"Josefin Sans"}>
          {doctor.map((doc) => {
            return doc.fname;
          })}
          {/* {doctor[0].fname} */}
        </Text>{" "}
      </Center>
      <HStack>
        <BiSearchAlt2 className="sicon" />
        <Input
          width={180}
          height={35}
          placeholder="Username"
          className="search"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
        <Button
          className="sbtn"
          fontFamily={"mono"}
          fontWeight={"medium"}
          onClick={searchi}
        >
          Search
        </Button>
      </HStack>

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
