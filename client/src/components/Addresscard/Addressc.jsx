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
} from "@chakra-ui/react";
function TestimonialCard(props) {
  const { name, role, content, avatar, index } = props;
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
          {props.hname.charAt(0).toUpperCase() +
            props.hname.slice(1) +
            " Hospital"}
        </chakra.p>
        <chakra.p fontFamily={"Work Sans"} fontWeight={"bold"} fontSize={14}>
          <chakra.span
            fontFamily={"Inter"}
            fontWeight={"medium"}
            color={"gray.500"}
          >
            {props.street.charAt(0).toUpperCase() + props.street.slice(1)}
          </chakra.span>
          <chakra.span
            fontFamily={"Inter"}
            fontWeight={"medium"}
            color={"gray.500"}
          >
            {"," + props.city}
          </chakra.span>
          <Text fontFamily={"Almarai"} fontWeight={"300"}>
            Mon-sat
          </Text>
          <Text fontFamily={"Almarai"} fontWeight={"300"}>
            Available from {props.ftime} to {props.ttime} (24hrs)
          </Text>
          <Text fontFamily={"Almarai"} fontWeight={"300"}>
            {props.cmpltadd}
          </Text>
        </chakra.p>
      </Flex>
    </Flex>
  );
}
export default TestimonialCard;
