import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../app/services/productsApi";
import type { IProduct } from "../interfaces";
import ProductSkeleton from "../components/ProductSkeleton";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const { isOnline } = useSelector((state: RootState) => state.network);

  if (isLoading || !isOnline)
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
