import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  HStack,
  Avatar,
  IconButton,
  Button,
  VStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useColorMode } from "./ui/color-mode-hooks";
import { LuSun, LuMoon, LuMenu, LuX } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { useCookies } from "react-cookie";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
];

const Navbar = () => {
  const { jwt } = useSelector((state: RootState) => state.auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [, , removeCookie] = useCookies(["token"]);

  return (
    <Box
      as="nav"
      bg={{ base: "white", _dark: "#1a1a2e" }}
      borderBottom={{
        base: "1px solid #e2e8f0",
        _dark: "1px solid #2d3748",
      }}
      px={6}
      py={3}
    >
      <Flex
        maxW="7xl"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={{ base: "gray.800", _dark: "white" }}
            _hover={{ opacity: 0.8 }}
            cursor="pointer"
          >
            ECOMMERCE
          </Text>
        </NavLink>

        {/* Center Nav Links */}
        <HStack gap={8} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive
                  ? colorMode === "dark"
                    ? "#63b3ed"
                    : "#2b6cb0"
                  : colorMode === "dark"
                    ? "#a0aec0"
                    : "#4a5568",
                fontWeight: isActive ? "600" : "400",
                borderBottom: isActive ? "2px solid" : "2px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s ease",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </HStack>

        {/* Right Side: Settings + Avatar */}
        <HStack gap={{ base: 3, md: 6 }}>
          <IconButton
            aria-label="Toggle color mode"
            variant="ghost"
            size="sm"
            rounded="full"
            onClick={toggleColorMode}
            color={{ base: "gray.600", _dark: "gray.300" }}
            _hover={{
              bg: { base: "gray.100", _dark: "whiteAlpha.200" },
            }}
          >
            {colorMode === "dark" ? <LuSun /> : <LuMoon />}
          </IconButton>

          {!jwt ? (
            <Button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              asChild
            >
              <NavLink
                to={"/login"}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  fontWeight: isActive ? "600" : "400",
                  borderBottom: isActive
                    ? "2px solid"
                    : "2px solid transparent",
                  paddingBottom: "2px",
                  transition: "all 0.2s ease",
                })}
              >
                Login
              </NavLink>
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(logout());
                removeCookie("token");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          )}

          <Avatar.Root size="sm" cursor="pointer">
            <Avatar.Fallback
              bg={{ base: "blue.500", _dark: "blue.400" }}
              color="white"
              name="User"
            />
          </Avatar.Root>

          {/* Mobile Menu Toggle */}
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={() => setIsOpen(!isOpen)}
            variant="ghost"
            size="sm"
            aria-label="Toggle Navigation"
            color={{ base: "gray.600", _dark: "gray.300" }}
          >
            {isOpen ? <LuX /> : <LuMenu />}
          </IconButton>
        </HStack>
      </Flex>

      {/* Mobile Nav */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as="nav" gap={4} mt={4} alignItems="flex-start">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive
                    ? colorMode === "dark"
                      ? "#63b3ed"
                      : "#2b6cb0"
                    : colorMode === "dark"
                      ? "#a0aec0"
                      : "#4a5568",
                  fontWeight: isActive ? "600" : "400",
                  borderLeft: isActive ? "4px solid" : "4px solid transparent",
                  paddingLeft: "8px",
                  transition: "all 0.2s ease",
                  width: "100%",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
