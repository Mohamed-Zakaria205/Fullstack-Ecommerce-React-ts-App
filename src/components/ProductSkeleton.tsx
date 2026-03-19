import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box
      padding="6"
      rounded={"lg"}
      boxShadow="lg"
      bg={{ base: "white", _dark: "gray.700" }}
    >
      <SkeletonCircle size="40" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={4} height="2" />
      <SkeletonText mt="8" noOfLines={1} height="12" />
    </Box>
  );
};

export default ProductSkeleton;
