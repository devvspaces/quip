import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function useGeoLocation() {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();

  const toast = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of user location variable
          setUserLocation({ latitude, longitude });
        },
        // if there was an error getting the users location
        (error) => {
          toast({
            title: "We couldn't get your location",
            description: "Location is required to get nearby facilities",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          console.error("Error getting user location:", error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return userLocation;
}
