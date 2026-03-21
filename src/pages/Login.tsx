import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useLoginMutation } from "../app/services/authApi";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/features/Auth/authSlice";
import { toaster } from "../components/ui/toaster-instance";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(identifier);

  const emailError = isSubmitted && (!identifier.trim() || !isEmailValid);
  const passwordError =
    isSubmitted && (!password.trim() || password.length < 6);

  const [, setCookie] = useCookies(["token"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      !identifier.trim() ||
      !isEmailValid ||
      !password.trim() ||
      password.length < 6
    )
      return;

    try {
      const response = await login({ identifier, password }).unwrap();
      dispatch(setCredentials({ user: response.user, jwt: response.jwt }));

      setCookie("token", response.jwt, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      console.log(response);

      toaster.create({
        title: `Login successful, You'll navigate after 2 seconds`,
        type: "success",
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (err) {
      const error = err as { data?: { error?: { message?: string } } };

      toaster.create({
        title: `${error?.data?.error?.message}`,
        type: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Flex
      minH="80vh"
      align="start"
      justify="center"
      bg="none"
      px={4}
      marginTop={"100px"}
    >
      <Box w="full" maxW="md" asChild>
        <form onSubmit={handleSubmit}>
          {/* Heading */}
          <Heading
            as="h1"
            textAlign="center"
            mb={8}
            fontSize="2xl"
            fontWeight="bold"
            color={{ base: "gray.800", _dark: "white" }}
          >
            Sign in to your account
          </Heading>

          {/* Card */}
          <Box
            bg={{ base: "white", _dark: "#2d3352" }}
            borderRadius="xl"
            p={8}
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
          >
            {/* Email Field */}
            <Box mb={6}>
              <Text fontWeight="semibold" color="white" mb={2} fontSize="sm">
                Email address
              </Text>
              <Input
                id="email-input"
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter Email Address"
                bg="transparent"
                borderColor={emailError ? "#e91e8c" : "gray.500"}
                borderWidth="2px"
                color={{ base: "gray.800", _dark: "white" }}
                _hover={{ borderColor: emailError ? "#ff2ea8" : "gray.400" }}
                _focus={{
                  borderColor: emailError ? "#ff2ea8" : "cyan.400",
                  boxShadow: emailError
                    ? "0 0 0 1px #ff2ea8"
                    : "0 0 0 1px var(--chakra-colors-cyan-400)",
                }}
                h="48px"
                borderRadius="md"
              />
              {emailError && (
                <Text color="#e91e8c" fontSize="xs" mt={1}>
                  {!identifier.trim()
                    ? "Email is required"
                    : "Invalid email address"}
                </Text>
              )}
            </Box>

            {/* Password Field */}
            <Box mb={6}>
              <Text fontWeight="semibold" color="white" mb={2} fontSize="sm">
                Password
              </Text>
              <Box position="relative" w="full">
                <Input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  bg="transparent"
                  borderColor={passwordError ? "#e91e8c" : "gray.500"}
                  borderWidth="2px"
                  color={{ base: "gray.800", _dark: "white" }}
                  _hover={{
                    borderColor: passwordError ? "#ff2ea8" : "gray.400",
                  }}
                  _focus={{
                    borderColor: passwordError ? "#ff2ea8" : "cyan.400",
                    boxShadow: passwordError
                      ? "0 0 0 1px #ff2ea8"
                      : "0 0 0 1px var(--chakra-colors-cyan-400)",
                  }}
                  h="48px"
                  borderRadius="md"
                  pr="48px"
                />
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: "white", bg: "transparent" }}
                  size="sm"
                  css={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                  }}
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </IconButton>
              </Box>
              {passwordError && (
                <Text color="#e91e8c" fontSize="xs" mt={1}>
                  {!password.trim()
                    ? "Password is required"
                    : "Password must be at least 6 characters"}
                </Text>
              )}
            </Box>

            {/* Remember me & Forgot password */}
            <Flex align="center" justify="space-between" mb={6}>
              <Checkbox.Root
                id="remember-checkbox"
                colorPalette="cyan"
                variant="outline"
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control
                  borderColor="gray.400"
                  _checked={{
                    bg: "cyan.400",
                    borderColor: "cyan.400",
                  }}
                >
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Label>
                  <Text
                    color={{ base: "gray.800", _dark: "white" }}
                    fontSize="sm"
                  >
                    Remember me
                  </Text>
                </Checkbox.Label>
              </Checkbox.Root>

              <Text
                color="cyan.400"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ textDecoration: "underline", color: "cyan.300" }}
                cursor="pointer"
              >
                Forgot password?
              </Text>
            </Flex>

            {/* Sign In Button */}
            <Button
              id="sign-in-button"
              w="full"
              h="48px"
              bg="linear-gradient(135deg, #00e5ff, #00bcd4)"
              color="white"
              fontWeight="bold"
              fontSize="md"
              borderRadius="lg"
              type="submit"
              loading={isLoading}
              _hover={{
                bg: "linear-gradient(135deg, #00bcd4, #0097a7)",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 15px rgba(0, 229, 255, 0.4)",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s ease"
            >
              Sign in
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
