import { Table, Button, Flex, Image } from "@chakra-ui/react";
import TableSkeleton from "../../components/TableSkeleton";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { HiOutlineEye } from "react-icons/hi";
import {
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
} from "../../app/services/productsApi";
import type { IProduct } from "../../interfaces";
import CustomDialog from "../../components/ui/CustomDialog";

const DashboardProducts = () => {
  const { data, isLoading, error } = useGetDashboardProductsQuery({ page: 1 });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error</div>;
  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header bg={{ base: "gray.200", _dark: "blue.900" }}>
        <Table.Row>
          <Table.ColumnHeader textAlign={"center"}>Product</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>
            thumbnail
          </Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Stock</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data?.data?.map((product: IProduct) => (
          <Table.Row key={product.documentId}>
            <Table.Cell textAlign="center">{product.title}</Table.Cell>
            <Table.Cell textAlign="center">
              {product.category?.title}
            </Table.Cell>
            <Table.Cell textAlign="center">${product.price}</Table.Cell>
            <Table.Cell textAlign="center">
              <Image
                src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`}
                alt="Green double couch with wooden legs"
                boxSize={"50px"}
                rounded={"full"}
                mx={"auto"}
                mt={4}
                objectFit={"fill"}
              />
            </Table.Cell>
            <Table.Cell textAlign="center">{product.stock}</Table.Cell>
            <Table.Cell>
              <Flex gap={2} justifyContent="center" alignItems="center">
                <Button colorPalette="cyan" size="sm" variant="solid">
                  <HiOutlineEye />
                </Button>
                <Button colorPalette="blue" size="sm" variant="solid">
                  <LuPencil />
                </Button>
                <CustomDialog
                  title="Delete Product"
                  description={`Are you sure you want to delete "${product.title}"? This action cannot be undone.`}
                  okText="Delete"
                  cancelText="Cancel"
                  isLoading={isDeleting}
                  onOk={() => {
                    deleteProduct(product.documentId);
                  }}
                  dialogTrigger={
                    <Button colorPalette="red" size="sm" variant="solid">
                      <LuTrash2 />
                    </Button>
                  }
                />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default DashboardProducts;
