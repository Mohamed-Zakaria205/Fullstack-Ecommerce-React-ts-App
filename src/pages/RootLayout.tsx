import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Container } from "@chakra-ui/react";

const RootLayout = () => {
  return (
    <Box>
      <Navbar />
      <Container maxW="8xl" px={6} py={8}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default RootLayout;
