import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg={{ base: "white", _dark: "gray.900" }}>
      <SkeletonCircle size="20" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={4} height="2" rootProps={{ gap: "4" }} />
    </Box>
  );
};

export default ProductSkeleton;
