import {
  Avatar,
  Box,
  chakra,
  Container,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import axios from "axios";
function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box d="flex" alignItems="center">
      <HStack>
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1" }}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
      </HStack>
    </Box>
  );
}

function TestimonialCard(props) {
  // const { review, stars } = props;
  const url = "http://localhost:7000";
  const [name, setname] = useState("");
  useEffect(() => {
    const dat = {
      pid: props.pid,
    };
    console.log(dat);
    axios.post(url + "/getname", dat).then((result) => {
      console.log("Username" + result.data);
      setname(result.data);
    });
  }, []);

  console.log("review");
  return (
    <Flex
      boxShadow={"lg"}
      direction={{ base: "column-reverse", md: "row" }}
      width={"full"}
      rounded={"xl"}
      p={10}
      justifyContent={"space-between"}
      position={"relative"}
      bg={useColorModeValue("white", "gray.800")}
      borderColor={"red"}
      borderStyle={"solid"}
    >
      <Flex direction={"column"} textAlign={"left"}>
        <chakra.p
          fontFamily={"Rubik"}
          fontWeight={"Regular"}
          fontSize={"20px"}
          pb={4}
        >
          {name}
        </chakra.p>
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          <Text fontFamily={"Almarai"} fontWeight={"300"}>
            {props.review}
          </Text>
        </chakra.p>
        <br />
        {/* {console.log("rating " + props.stars)} */}
        <Text paddingBottom={1}>ratings given</Text>
        <Rating rating={parseFloat(props.stars)} />
      </Flex>
    </Flex>
  );
}
export default TestimonialCard;
