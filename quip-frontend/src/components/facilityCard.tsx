import Healthcare from "@/helpers/interface";
import { PhoneIcon } from "@chakra-ui/icons";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import moment from "moment";
import { ReactElement } from "react";
import { CgWebsite } from "react-icons/cg";
import { CiLocationArrow1 } from "react-icons/ci";
import { FiMail } from "react-icons/fi";

function boolToString(val?: Boolean) {
  if (val === true) return "Yes";
  if (val === false) return "No";
  return "";
}

function LrText({ name, value }: { name: string; value?: string }) {
  return (
    <Flex align={"center"} justify={"space-between"}>
      <Text fontWeight={600} w={"200px"} minW={"200px"}>
        {name}
      </Text>
      <Text>{value ?? ""}</Text>
    </Flex>
  );
}
function LrCustom({ name, value }: { name: string; value: ReactElement }) {
  return (
    <Flex align={"start"} justify={"space-between"}>
      <Text fontWeight={600} w={"200px"} minW={"200px"}>
        {name}
      </Text>
      {value}
    </Flex>
  );
}

function calculateTravelTime(distance: number, avgSpeed: number): string {
  const travelTime = distance / avgSpeed;
  const hours = Math.floor(travelTime);
  const minutes = Math.floor((travelTime - hours) * 60);
  const seconds = Math.floor(((travelTime - hours) * 3600) % 60);

  if (hours >= 1) {
    return `${hours} hours`;
  } else if (minutes >= 1) {
    return `${minutes} minutes`;
  } else {
    return `${seconds} seconds`;
  }
}

export default function FacilityCard({ facility }: { facility: Healthcare }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function arrayToFlex(val: string[]) {
    return (
      <Flex wrap={"wrap"} gap={2} justify={"flex-end"}>
        {val.map((v, i) => (
          <Badge key={i} colorScheme="green">
            {v}
          </Badge>
        ))}
      </Flex>
    );
  }

  return (
    <Center>
      <Box
        maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Heading mb={4} fontSize={"2xl"} fontFamily={"body"}>
          {facility.facilityName}
        </Heading>
        <Text mb={4}>
          {facility.distance
            ? Math.floor(facility.distance).toLocaleString()
            : "-"}{" "}
          Miles /{" "}
          {facility.distance ? calculateTravelTime(facility.distance, 30) : "-"}{" "}
          away
        </Text>

        <HStack align={"center"} justify={"center"} mt={6} wrap={"wrap"}>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            {facility.ownership}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            {facility.facilityLevel}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            {facility.operationalStatus}
          </Badge>
          <Badge
            px={2}
            py={1}
            bg={useColorModeValue("gray.50", "gray.800")}
            fontWeight={"400"}
          >
            Open
          </Badge>
        </HStack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button flex={1} fontSize={"sm"} rounded={"full"} onClick={onOpen}>
            Info
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
          >
            Visit
          </Button>
          <Button flex={1} fontSize={"sm"} rounded={"full"}>
            Call
          </Button>
        </Stack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Facility Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Identifiers
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
                  <LrText
                    name={"Facility Name"}
                    value={facility.facilityName}
                  />
                  <LrText
                    name={"Start Date"}
                    value={
                      facility.startDate
                        ? moment(facility.startDate).format("Do MMMM YYYY")
                        : ""
                    }
                  />
                  <LrText name={"Ownership"} value={facility.ownership} />
                  <LrText
                    name={"Ownership Type"}
                    value={facility.ownershipType}
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Availability
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
                  <LrText
                    name={"Days of Operation"}
                    value={facility.daysOfOperation.join(", ")}
                  />
                  <LrText
                    name={"Hours of Operation"}
                    value={facility.hoursOfOperation.join(" - ")}
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Location
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
                  <LrText name={"State"} value={facility.state} />
                  <LrText name={"LGA"} value={facility.lga} />
                  <LrText name={"Ward"} value={facility.ward} />
                  <LrText
                    name={"Physical Location"}
                    value={facility.physicalLocation}
                  />
                  <LrText
                    name={"Postal Address"}
                    value={facility.postalAddress}
                  />
                  <LrCustom
                    name={"Location"}
                    value={
                      <Link href="www.google.com">
                        <IconButton
                          aria-label="phone"
                          icon={<CiLocationArrow1 />}
                          size={"sm"}
                        />
                      </Link>
                    }
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Contact
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
                  <LrCustom
                    name={"Phone"}
                    value={
                      <Link href={`tel:+${facility.phone ?? "#"}`}>
                        <IconButton
                          aria-label="phone"
                          icon={<PhoneIcon />}
                          size={"sm"}
                        />
                      </Link>
                    }
                  />
                  <LrCustom
                    name={"Alternate Phone"}
                    value={
                      <Link href={`tel:+${facility.alternatePhone ?? "#"}`}>
                        <IconButton
                          aria-label="phone"
                          icon={<PhoneIcon />}
                          size={"sm"}
                        />
                      </Link>
                    }
                  />
                  <LrCustom
                    name={"Email"}
                    value={
                      <Link href={`mail:+${facility.email ?? "#"}`}>
                        <IconButton
                          aria-label="phone"
                          icon={<FiMail />}
                          size={"sm"}
                        />
                      </Link>
                    }
                  />
                  <LrCustom
                    name={"Website"}
                    value={
                      <Link href={facility.website ?? "#"} target="_blank">
                        <IconButton
                          aria-label="phone"
                          icon={<CgWebsite />}
                          size={"sm"}
                        />
                      </Link>
                    }
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      Services
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                >
                  <LrCustom
                    name={"Out Patient"}
                    value={
                      <Badge colorScheme="green">
                        {boolToString(facility.outPatient)}
                      </Badge>
                    }
                  />
                  <LrCustom
                    name={"In Patient"}
                    value={
                      <Badge colorScheme="green">
                        {boolToString(facility.inPatient)}
                      </Badge>
                    }
                  />
                  <LrCustom
                    name={"Medical"}
                    value={arrayToFlex(facility.medicalServices)}
                  />
                  <LrCustom
                    name={"Surgical"}
                    value={arrayToFlex(facility.surgicalServices)}
                  />
                  <LrCustom
                    name={"Obstetrics and Gynecology"}
                    value={arrayToFlex(facility.obstericsAndGynecologyServices)}
                  />
                  <LrCustom
                    name={"Pediatrics"}
                    value={arrayToFlex(facility.pediatricsServices)}
                  />
                  <LrCustom
                    name={"Dental"}
                    value={arrayToFlex(facility.dentalServices)}
                  />
                  <LrCustom
                    name={"Specific"}
                    value={arrayToFlex(facility.specificServices)}
                  />
                  <LrCustom
                    name={"Onsite Laboratory"}
                    value={
                      <Badge colorScheme="green">
                        {boolToString(facility.onSiteLaboratory)}
                      </Badge>
                    }
                  />
                  <LrCustom
                    name={"Onsite Imaging"}
                    value={
                      <Badge colorScheme="green">
                        {boolToString(facility.onSiteImaging)}
                      </Badge>
                    }
                  />
                  <LrCustom
                    name={"Onsite Pharmacy"}
                    value={
                      <Badge colorScheme="green">
                        {boolToString(facility.onSitePharmacy)}
                      </Badge>
                    }
                  />
                  <LrCustom
                    name={"Ambulance"}
                    value={
                      <Badge colorScheme="green">
                        {boolToString(facility.ambulanceServices)}
                      </Badge>
                    }
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  );
}
