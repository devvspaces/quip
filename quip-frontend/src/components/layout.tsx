import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import Link from "next/link";
import Footer from "./footer";

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box minH={'100vh'}>
        <Box
          bg={useColorModeValue("gray.100", "gray.900")}
          w={"100%"}
          position="fixed"
          zIndex={1}
          top={0}
        >
          <Container maxW={"1200px"}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
              <Box>
                <Heading>
                  <Link href={"/"}>CareCompass</Link>
                </Heading>
              </Box>
              <Flex alignItems={"center"}>
                <Stack direction={"row"} spacing={7}>
                  <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </Stack>
              </Flex>
            </Flex>
          </Container>
        </Box>
        <Container marginTop={20} maxW={"1200px"} h={'100%'}>
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  );
}
