import { useState } from "react";
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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  const emailError = isSubmitted && (!email.trim() || !isEmailValid);
  const passwordError =
    isSubmitted && (!password.trim() || password.length < 6);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      !email.trim() ||
      !isEmailValid ||
      !password.trim() ||
      password.length < 6
    )
      return;

    // TODO: handle login logic
    console.log("Login", { email, password });
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="none" px={4}>
      <Box w="full" maxW="md" asChild>
        <form onSubmit={handleSubmit}>
          {/* Heading */}
          <Heading
            as="h1"
            textAlign="center"
            mb={8}
            fontSize="2xl"
            fontWeight="bold"
            color="white"
          >
            Sign in to your account
          </Heading>

          {/* Card */}
          <Box
            bg="#2d3352"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                bg="transparent"
                borderColor={emailError ? "#e91e8c" : "gray.500"}
                borderWidth="2px"
                color="white"
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
                  {!email.trim()
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
                  placeholder=""
                  bg="transparent"
                  borderColor={passwordError ? "#e91e8c" : "gray.500"}
                  borderWidth="2px"
                  color="white"
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
                  <Text color="white" fontSize="sm">
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
