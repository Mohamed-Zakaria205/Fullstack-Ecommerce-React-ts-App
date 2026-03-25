import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react";
import type { IProduct } from "../interfaces";
import { removeFromCartAction } from "../app/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import Delete from "./SVGs/Delete";

interface Props {
  product: IProduct;
}
const CartDrawerItem = ({
  product: { title, price, thumbnail, quantity, documentId },
}: Props) => {
  const dispatch = useDispatch();
  return (
    <>
      <Flex gap={6} py={2} mb={3} alignItems={"center"}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail?.url}`}
          rounded="full"
          h="60px"
          w="60px"
          objectFit="cover"
        />
        <Stack w="full">
          <Flex gap={2} direction={"column"}>
            <Text fontSize={"sm"}> {title}</Text>
            <Text fontSize={"sm"}>Price: ${price}</Text>
            <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          </Flex>
          <Button
            variant={"outline"}
            size={"xs"}
            color={"red.400"}
            w={32}
            rounded={"md"}
            // bg={"red.200"}
            // ml={"auto"}
            _hover={{ bg: "red.200", color: "red.500" }}
            onClick={() => dispatch(removeFromCartAction(documentId))}
          >
            <Delete /> remove
          </Button>
        </Stack>
      </Flex>

      <Separator />
    </>
  );
};

export default CartDrawerItem;
