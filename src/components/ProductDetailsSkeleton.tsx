import { Card, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";

const ProductDetailsSkeleton = () => {
  return (
    <>
      <Flex
        alignItems={"center"}
        maxWidth={"sm"}
        my={7}
        fontSize={"lg"}
        mx={"auto"}
      >
        <BsArrowLeft />
        <Skeleton ml={2} height="6" width="12" />
      </Flex>
      <Card.Root
        overflow="hidden"
        bg={"none"}
        border={{ base: "1px solid #a8b5c8", _dark: "1px solid #4a5568" }}
        maxWidth={"sm"}
        mx={"auto"}
        mb={20}
      >
        <Skeleton
          mt={4}
          rounded={"lg"}
          width={"340px"}
          height={"300px"}
          mx={"auto"}
        />
        <Card.Body gap="2" alignItems="center">
          <Skeleton height="8" width="80%" />
          <SkeletonText noOfLines={3} gap="4" width="full" mt={2} />
          <Skeleton height="8" width="30%" mt="2" />
        </Card.Body>
        <Card.Footer gap="2">
          <Skeleton height="20" width="full" rounded="md" />
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default ProductDetailsSkeleton;
