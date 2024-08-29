import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import FacilityCard from "@/components/facilityCard";
import { useEffect, useState } from "react";
import { instance } from "@/helpers/api";
import Healthcare, {
  FacilityLevelObj,
  LicenseStatusObj,
  OperationalStatusObj,
  Ownership,
  OwnershipObj,
  RegistrationStatusObj,
} from "@/helpers/interface";
import { FiFilter } from "react-icons/fi";
import { useGeoLocation } from "@/hooks/useGeoLocation";

export default function Home() {
  const NUMBER_OF_FACILITIES_TO_FETCH = 15;

  const location = useGeoLocation();

  const [facilities, setFacilities] = useState<Healthcare[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    facilityLevel: "",
    ownership: "",
    licenseStatus: "",
    operationalStatus: "",
    registrationStatus: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const query: Record<string, string> = {};
    for (let k of Object.keys(formData)) {
      if ((formData as any)[k] !== "") {
        query[k] = (formData as any)[k];
      }
    }
    // Handle form submission logic here
    const data =
      (await getFacilities(0, NUMBER_OF_FACILITIES_TO_FETCH, query)) ?? [];
    setFacilities([...data]);
    setOffset(data.length);
  }

  async function handleClear() {
    const data = (await getFacilities(0, NUMBER_OF_FACILITIES_TO_FETCH)) ?? [];
    setFacilities([...data]);
    setOffset(data.length);
  }

  const toast = useToast();

  const getFacilities = async (
    offset: number,
    limit: number,
    data?: Record<string, string>
  ) => {
    try {
      const locate = {
        longitude: location?.longitude.toString() ?? "",
        latitude: location?.latitude.toString() ?? "",
      };
      const query = {
        skip: offset.toString(),
        take: limit.toString(),
        ...(location ? locate : {}),
        ...data,
      };
      // Convert query to url search params
      const searchParams = new URLSearchParams(query);
      setIsLoading(true);
      const response = await instance.get(
        `facilities?${searchParams.toString()}`
      );
      setIsLoading(false);
      const hasNext = response.data.hasNext;
      setHasNextPage(hasNext);
      return response.data.data as Healthcare[];
    } catch (error: unknown) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: "Error",
        description: "An error occurred while fetching facilities",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    // Fetch facilities from API
    async function fetchFacilities() {
      const query: Record<string, string> = {};
      for (let k of Object.keys(formData)) {
        if ((formData as any)[k] !== "") {
          query[k] = (formData as any)[k];
        }
      }
      let data =
        (await getFacilities(offset, NUMBER_OF_FACILITIES_TO_FETCH, query)) ??
        [];
      setFacilities(data);
      setOffset(offset + data.length);
    }

    fetchFacilities();
  }, [location]);

  const loadMoreUsers = async () => {
    const query: Record<string, string> = {};
    for (let k of Object.keys(formData)) {
      if ((formData as any)[k] !== "") {
        query[k] = (formData as any)[k];
      }
    }
    const data =
      (await getFacilities(offset, NUMBER_OF_FACILITIES_TO_FETCH, query)) ?? [];
    setFacilities([...facilities, ...data]);
    setOffset(offset + data.length);
  };

  return (
    <>
      <Head>
        <title>CareCompass - Search</title>
        <meta name="description" content="Instantly connect patients with nearby accredited healthcare facilities through smart, location-based search technology." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Design two column ui one bigger than the other and well separated, the one on the left will be used as a filter box where users can 
      enter the search term, using the dropdown filters and the one on the right will display the results of the search in a card format. Note use charkra ui components */}

      <Box pos={"relative"} h={"100%"}>
        <IconButton
          pos={"fixed"}
          right={"5rem"}
          top={".7rem"}
          aria-label="search"
          icon={<FiFilter />}
          colorScheme="blue"
          onClick={onOpen}
          zIndex={2}
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search</DrawerHeader>

            <DrawerBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4} mb={4}>
                  <FormControl>
                    <FormLabel>Facility name</FormLabel>
                    <Input
                      name="name"
                      placeholder="Enter facility name"
                      onChange={handleChange}
                      value={formData.name}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Ownership</FormLabel>
                    <Select
                      name="ownership"
                      placeholder="Select option"
                      onChange={handleChange}
                      value={formData.ownership}
                    >
                      {OwnershipObj.map((item, i) => {
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Facility Level</FormLabel>
                    <Select
                      name="facilityLevel"
                      placeholder="Select option"
                      onChange={handleChange}
                      value={formData.facilityLevel}
                    >
                      {FacilityLevelObj.map((item, i) => {
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Operational Status</FormLabel>
                    <Select
                      name="operationalStatus"
                      placeholder="Select option"
                      onChange={handleChange}
                      value={formData.operationalStatus}
                    >
                      {OperationalStatusObj.map((item, i) => {
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Registration Status</FormLabel>
                    <Select
                      name="registrationStatus"
                      placeholder="Select option"
                      onChange={handleChange}
                      value={formData.registrationStatus}
                    >
                      {RegistrationStatusObj.map((item, i) => {
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>License Status</FormLabel>
                    <Select
                      name="licenseStatus"
                      placeholder="Select option"
                      onChange={handleChange}
                      value={formData.licenseStatus}
                    >
                      {LicenseStatusObj.map((item, i) => {
                        return (
                          <option key={i} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>
              </form>
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={(e) => {
                  setFormData({
                    name: "",
                    facilityLevel: "",
                    ownership: "",
                    licenseStatus: "",
                    operationalStatus: "",
                    registrationStatus: "",
                  });
                  handleClear();
                  onClose();
                }}
              >
                Clear
              </Button>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={(e) => {
                  handleSubmit(e);
                  onClose();
                }}
              >
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Box>
          {/* Search results */}
          <Flex wrap={"wrap"} gap={"2rem"} alignItems={"stretch"}>
            {facilities.map((item, index) => (
              <FacilityCard key={index} facility={item} />
            ))}
          </Flex>
          {facilities.length === 0 && (
            <Center>
              <Text fontSize={"xl"}>No facilities found nearby</Text>
            </Center>
          )}
          <Center py={"3rem"}>
            {hasNextPage && (
              <Button onClick={loadMoreUsers} isLoading={isLoading}>
                Load more
              </Button>
            )}
          </Center>
        </Box>
      </Box>
    </>
  );
}
