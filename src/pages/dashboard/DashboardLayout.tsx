import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuPackage,
  LuFolderOpen,
  LuSearch,
  LuSun,
  LuMoon,
} from "react-icons/lu";
import { useColorMode } from "../../components/ui/color-mode-hooks";

const sidebarLinks = [
  { label: "Dashboard", to: "/dashboard", icon: LuLayoutDashboard },
  { label: "Products", to: "/dashboard/products", icon: LuPackage },
  { label: "Categories", to: "/dashboard/categories", icon: LuFolderOpen },
];

const DashboardLayout = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  // Build breadcrumb from pathname
  const pathSegments = location.pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => seg.charAt(0).toUpperCase() + seg.slice(1));

  // Get the current page title (last segment)
  const pageTitle = pathSegments[pathSegments.length - 1] || "Dashboard";

  return (
    <Flex minH="100vh">
      {/* ─── Sidebar ─── */}
      <Box
        as="aside"
        w="240px"
        bg={{ base: "gray.800", _dark: "#1a1a2e" }}
        color="white"
        py={6}
        px={4}
        display={{ base: "none", md: "flex" }}
        flexDirection="column"
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        zIndex={10}
      >
        {/* Logo */}
        <Text
          fontSize="xl"
          fontWeight="bold"
          mb={8}
          px={2}
          letterSpacing="wide"
        >
          Logo
        </Text>

        {/* Navigation Links */}
        <VStack gap={1} align="stretch">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/dashboard"}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <HStack
                  gap={3}
                  px={3}
                  py={2.5}
                  rounded="md"
                  bg={isActive ? "whiteAlpha.200" : "transparent"}
                  color={isActive ? "white" : "whiteAlpha.700"}
                  _hover={{
                    bg: "whiteAlpha.100",
                    color: "white",
                  }}
                  transition="all 0.2s ease"
                  cursor="pointer"
                >
                  <link.icon size={18} />
                  <Text fontSize="sm" fontWeight={isActive ? "600" : "400"}>
                    {link.label}
                  </Text>
                </HStack>
              )}
            </NavLink>
          ))}
        </VStack>
      </Box>

      {/* ─── Main Content ─── */}
      <Box
        ml={{ base: 0, md: "240px" }}
        flex={1}
        bg={{ base: "gray.50", _dark: "#16162a" }}
      >
        {/* ─── Top Header ─── */}
        <Flex
          as="header"
          h="60px"
          px={6}
          alignItems="center"
          justifyContent="space-between"
          bg={{ base: "white", _dark: "#1e1e3a" }}
          borderBottom={{
            base: "1px solid #e2e8f0",
            _dark: "1px solid #2d3748",
          }}
          position="sticky"
          top={0}
          zIndex={5}
        >
          {/* Breadcrumb */}
          <HStack
            gap={1}
            fontSize="sm"
            color={{ base: "gray.500", _dark: "gray.400" }}
          >
            {pathSegments.map((seg, idx) => (
              <HStack key={idx} gap={1}>
                {idx > 0 && <Text>/</Text>}
                <Text
                  fontWeight={idx === pathSegments.length - 1 ? "600" : "400"}
                  color={
                    idx === pathSegments.length - 1
                      ? { base: "gray.800", _dark: "white" }
                      : undefined
                  }
                >
                  {seg}
                </Text>
              </HStack>
            ))}
          </HStack>

          {/* Right side: Theme Toggle + Search + Avatar */}
          <HStack gap={4}>
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              size="sm"
              rounded="full"
              onClick={toggleColorMode}
              color={{ base: "gray.600", _dark: "gray.300" }}
              _hover={{ bg: { base: "gray.100", _dark: "whiteAlpha.200" } }}
            >
              {colorMode === "dark" ? <LuSun /> : <LuMoon />}
            </IconButton>

            <IconButton
              aria-label="Search"
              variant="ghost"
              size="sm"
              rounded="full"
              color={{ base: "gray.600", _dark: "gray.300" }}
              _hover={{ bg: { base: "gray.100", _dark: "whiteAlpha.200" } }}
            >
              <LuSearch />
            </IconButton>

            <HStack gap={3} cursor="pointer">
              <Avatar.Root size="sm" colorPalette="teal">
                <Avatar.Fallback name="Justina Clark" />
                <Avatar.Image src="https://bit.ly/broken-link" />
              </Avatar.Root>
              <Box display={{ base: "none", lg: "block" }}>
                <Text
                  fontSize="sm"
                  fontWeight="600"
                  lineHeight="short"
                  color={{ base: "gray.800", _dark: "white" }}
                >
                  Justina Clark
                </Text>
                <Text
                  fontSize="xs"
                  color={{ base: "gray.500", _dark: "gray.400" }}
                >
                  Admin
                </Text>
              </Box>
            </HStack>
          </HStack>
        </Flex>

        {/* ─── Page Content ─── */}
        <Box p={6}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={6}
            color={{ base: "gray.800", _dark: "white" }}
          >
            {pageTitle}
          </Text>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
