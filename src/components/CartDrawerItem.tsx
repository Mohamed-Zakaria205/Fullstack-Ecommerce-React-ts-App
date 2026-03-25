import { Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Separator } from "@chakra-ui/react";
import type { IProduct } from "../interfaces";
import { removeFromCartAction } from "../app/features/cart/cartSlice";
import { useDispatch } from "react-redux";

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
          <Flex gap={6}>
            <Text fontSize={"sm"}> {title}</Text>
            <Text fontSize={"sm"}>Price: ${price}</Text>
          </Flex>
          <Text fontSize={"sm"}>Quantity: {quantity}</Text>
          <Button
            variant={"outline"}
            size={"xs"}
            color={"red.700"}
            w={"fit-content"}
            rounded={"md"}
            bg={"red.200"}
            ml={"auto"}
            onClick={() => dispatch(removeFromCartAction(documentId))}
          >
            Remove
          </Button>
        </Stack>
      </Flex>

      <Separator />
    </>
  );
};

export default CartDrawerItem;
