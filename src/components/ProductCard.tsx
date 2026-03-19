import { Button, Card, Image, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode-hooks";
import { Link } from "react-router-dom";
import type { IProduct } from "../interfaces";

interface IProps {
  product: IProduct;
}
const ProductCard = ({ product }: IProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  console.log(colorMode);
  return (
    <Card.Root
      overflow="hidden"
      bg={"none"}
      border={{ base: "1px solid #a8b5c8", _dark: "1px solid #4a5568" }}
    >
      <Image
        src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
        alt="Green double couch with wooden legs"
        boxSize={"200px"}
        rounded={"full"}
        mx={"auto"}
        mt={4}
        objectFit={"fill"}
      />
      <Card.Body gap="2">
        <Card.Title
          textAlign={"center"}
          color={{ base: "gray.800", _dark: "white" }}
        >
          {product.title}
        </Card.Title>
        <Card.Description
          fontSize={"sm"}
          textAlign={"center"}
          color={{ base: "gray.600", _dark: "gray.400" }}
        >
          {product.description}
        </Card.Description>
        <Text
          textStyle="2xl"
          fontWeight="medium"
          letterSpacing="tight"
          mt="2"
          textAlign={"center"}
          onClick={toggleColorMode}
          color={{ base: "green.600", _dark: "green.300" }}
        >
          ${product.price}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="solid" width={"full"} size={"xl"} asChild>
          <Link to={`/products/${product.documentId}`}>View Details</Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
