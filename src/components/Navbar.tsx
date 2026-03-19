import { Box, Flex, Text, HStack, Avatar, IconButton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useColorMode } from "./ui/color-mode-hooks";
import { LuSettings } from "react-icons/lu";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
];

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

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
            Logo
          </Text>
        </NavLink>

        {/* Center Nav Links */}
        <HStack gap={8}>
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
        <HStack gap={3}>
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
            <LuSettings />
          </IconButton>

          <Avatar.Root size="sm" cursor="pointer">
            <Avatar.Fallback
              bg={{ base: "blue.500", _dark: "blue.400" }}
              color="white"
              name="User"
            />
          </Avatar.Root>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
