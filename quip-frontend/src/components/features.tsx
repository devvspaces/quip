import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaMagnifyingGlassLocation, FaSearchengin } from "react-icons/fa6";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";
import { MdMobileFriendly } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      id="learn-more"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function Features() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Why use CareCompass?
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          By leveraging smart search technology and geographical APIs, we aim to
          bridge the gap between patients and healthcare providers, ensuring
          that quality medical care is just a few clicks away.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"AI Search"}
            icon={<Icon as={FaSearchengin} w={10} h={10} />}
            description={
              "Smart search functionality for finding healthcare facilities"
            }
            href={"#"}
          />
          <Card
            heading={"Geolocation"}
            icon={<Icon as={FaMagnifyingGlassLocation} w={10} h={10} />}
            description={
              "Integration with geographical APIs for precise user location"
            }
            href={"#"}
          />
          <Card
            heading={"User-friendly"}
            icon={<Icon as={MdMobileFriendly} w={10} h={10} />}
            description={
              "A user-friendly interface optimized for quick access to information"
            }
            href={"#"}
          />
          <Card
            heading={"Accredited Healthcare"}
            icon={<Icon as={RiVerifiedBadgeFill} w={10} h={10} />}
            description={
              "A database of accredited healthcare facilities"
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
