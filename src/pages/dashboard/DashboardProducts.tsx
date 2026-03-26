import { Table, Button, Flex } from "@chakra-ui/react";
import TableSkeleton from "../../components/TableSkeleton";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const DashboardProducts = () => {
  return <TableSkeleton />;
  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header bg={"gray.800"}>
        <Table.Row>
          <Table.ColumnHeader textAlign={"center"}>Product</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell textAlign="center">{item.name}</Table.Cell>
            <Table.Cell textAlign="center">{item.category}</Table.Cell>
            <Table.Cell textAlign="center">${item.price}</Table.Cell>
            <Table.Cell>
              <Flex gap={2} justifyContent="center" alignItems="center">
                <Button colorPalette="blue" size="sm" variant="outline">
                  <LuPencil /> Edit
                </Button>
                <Button colorPalette="red" size="sm" variant="outline">
                  <LuTrash2 /> Delete
                </Button>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
];

export default DashboardProducts;
