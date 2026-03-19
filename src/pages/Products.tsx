import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../app/features/productsList/productApi";
import type { IProduct } from "../interfaces";
import ProductSkeleton from "../components/ProductSkeleton";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery({});
  console.log("data", data, "isLoading", isLoading, "error", error);

  if (isLoading)
    return (
      <Grid templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"} gap={6}>
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </Grid>
    );
  return (
    <Grid
      margin={30}
      templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
      gap={6}
    >
      {data?.data.map((product: IProduct) => (
        <ProductCard key={product.documentId} product={product} />
      ))}
    </Grid>
  );
};

export default Products;
