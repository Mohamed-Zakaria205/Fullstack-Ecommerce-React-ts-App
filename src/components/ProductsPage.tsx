import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../app/features/productsList/productApi";
import type { IProduct } from "../interfaces";

const ProductsPage = () => {
  const { data, isLoading, error } = useGetProductsQuery({});
  console.log("data", data, "isLoading", isLoading, "error", error);
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

export default ProductsPage;
