import { Box, Button, Card, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../app/services/productsApi";
import ProductSkeleton from "../components/ProductSkeleton";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";

const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(id!);
  console.log(data?.data);

  useEffect(() => {
    document.title = `Products Store | Product ${data?.data?.title}`;
  }, [data]);
  if (isLoading)
    return (
      <Box maxWidth={"sm"} mx={"auto"} my={20}>
        <ProductSkeleton />
      </Box>
    );

  //Handlers
  const goBack = () => navigate(-1);
  return (
    <>
      <Flex
        alignItems={"center"}
        onClick={goBack}
        cursor={"pointer"}
        maxWidth={"sm"}
        my={7}
        fontSize={"lg"}
        mx={"auto"}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card.Root
        overflow="hidden"
        bg={"none"}
        border={{ base: "1px solid #a8b5c8", _dark: "1px solid #4a5568" }}
        maxWidth={"sm"}
        mx={"auto"}
        mb={20}
      >
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${data?.data?.thumbnail?.url}`}
          alt="Green double couch with wooden legs"
          mt={4}
          objectFit={"fill"}
          objectPosition={"top"}
          rounded={"lg"}
          width={"full"}
          height={"300px"}
        />
        <Card.Body gap="2">
          <Card.Title
            textAlign={"center"}
            color={{ base: "gray.800", _dark: "white" }}
          >
            {data?.data?.title}
          </Card.Title>
          <Card.Description
            fontSize={"sm"}
            textAlign={"center"}
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            {data?.data?.description}
          </Card.Description>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
            textAlign={"center"}
            color={{ base: "green.600", _dark: "green.300" }}
          >
            ${data?.data?.price}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
          <Button
            variant="solid"
            width={"full"}
            size={"xl"}
            p={8}
            textTransform={"uppercase"}
          >
            Add To Cart
          </Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default Product;
