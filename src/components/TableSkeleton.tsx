import { Skeleton, Table, Flex } from "@chakra-ui/react";

const TableSkeleton = () => {
  return (
    <Table.Root size="sm" variant="outline">
      <Table.Header bg={"transparent"}>
        <Table.Row>
          <Table.ColumnHeader textAlign={"center"}>Product</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign={"center"}>Action</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Array.from({ length: 5 }).map((_, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Skeleton height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Skeleton height="20px" />
            </Table.Cell>
            <Table.Cell>
              <Flex gap={2} justifyContent="center" alignItems="center">
                <Skeleton height="32px" width="70px" />
                <Skeleton height="32px" width="85px" />
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableSkeleton;
