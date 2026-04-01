import {
  Table,
  Button,
  Flex,
  Image,
  Field,
  Input,
  Stack,
  NumberInput,
  Textarea,
  For,
  NativeSelect,
} from "@chakra-ui/react";
import TableSkeleton from "../../components/TableSkeleton";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { HiOutlineEye } from "react-icons/hi";
import {
  useDeleteProductMutation,
  useGetDashboardProductsQuery,
  useUpdateProductMutation,
} from "../../app/services/productsApi";
import type { ICategory, IProduct } from "../../interfaces";
import CustomDialog from "../../components/ui/CustomDialog";
import { toaster } from "../../components/ui/toaster-instance";
import { useState } from "react";
import { useGetCategoriesQuery } from "../../app/services/categoriesApi";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const DashboardProducts = () => {
  const { data, isLoading, error } = useGetDashboardProductsQuery({ page: 1 });
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isError: isUpdateError, error: updateError },
  ] = useUpdateProductMutation();
  const [productToEdit, setProductToEdit] = useState<IProduct>({
    documentId: "",
    title: "",
    price: 0,
    description: "",
    stock: 0,
    category: {
      title: "",
      documentId: "",
    },
    thumbnail: {
      url: "",
    },
  });

  const { data: categoriesList } = useGetCategoriesQuery({});
  // const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { isOnline } = useSelector((state: RootState) => state.network);
  //* Handlers *//

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  };
  const onChangePriceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductToEdit({
      ...productToEdit,
      price: +e.target.value,
    });
  };
  const onChangeStockHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductToEdit({
      ...productToEdit,
      stock: +e.target.value,
    });
  };
  const onChangeDescriptionHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProductToEdit({
      ...productToEdit,
      description: e.target.value,
    });
  };
  const onChangeCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = categoriesList?.data?.find(
      (category: ICategory) => category.title === e.target.value,
    );
    setProductToEdit({
      ...productToEdit,
      category: selectedCategory,
    });
  };
  // const onChangeThumbnailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setThumbnail(file);
  //   }
  // };

  const onSubmitHandler = () => {
    // const formData = new FormData();

    // formData.append(
    //   "data",
    //   JSON.stringify({
    //     title: productToEdit.title,
    //     price: productToEdit.price,
    //     description: productToEdit.description,
    //     stock: productToEdit.stock,
    //     category: productToEdit.category,
    //   }),
    // );

    // if (thumbnail) {
    //   formData.append("files.thumbnail", thumbnail);
    // }

    updateProduct({
      id: productToEdit.documentId,
      data: {
        title: productToEdit.title,
        price: productToEdit.price,
        description: productToEdit.description,
        stock: productToEdit.stock,
        category: productToEdit.category,
      },
    });

    if (isUpdateError) {
      console.log(updateError);
    }
  };

  if (isLoading || !isOnline) return <TableSkeleton />;
  if (error) return <div>Error</div>;
  return (
    <Table.Root size="sm" variant="outline">
      <Table.Caption mt={4}>
        Total Products: {data?.data?.length ?? 0}
      </Table.Caption>
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
                src={`${import.meta.env.VITE_SERVER_URL}${product.thumbnail?.url}`}
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
                <CustomDialog
                  title="Update Product"
                  body={
                    <Stack gap="4">
                      <Field.Root>
                        <Field.Label>Title</Field.Label>
                        <Input
                          placeholder="Enter product title"
                          name="title"
                          value={productToEdit.title}
                          onChange={onChangeHandler}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Price</Field.Label>
                        <NumberInput.Root
                          width="full"
                          defaultValue={String(productToEdit.price)}
                          min={5}
                          step={0.5}
                          onChange={onChangePriceHandler}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Category</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            name="category"
                            value={productToEdit.category?.title}
                            onChange={onChangeCategoryHandler}
                          >
                            <For each={["smartphones", "laptops"]}>
                              {(item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              )}
                            </For>
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label>Stock</Field.Label>
                        <NumberInput.Root
                          width="full"
                          defaultValue={String(productToEdit.stock)}
                          min={1}
                          max={50}
                          onChange={onChangeStockHandler}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Description</Field.Label>
                        <Textarea
                          placeholder="Describe the product..."
                          value={productToEdit.description}
                          onChange={onChangeDescriptionHandler}
                        />
                      </Field.Root>
                      {/* <Field.Root>
                        <Field.Label>Thumbnail</Field.Label>
                        <FileUpload.Root onChange={onChangeThumbnailHandler}>
                          <FileUpload.HiddenInput />
                          <FileUpload.Trigger asChild>
                            <Button variant="outline" size="sm">
                              <HiUpload /> Upload file
                            </Button>
                          </FileUpload.Trigger>
                          <FileUpload.List />
                        </FileUpload.Root>
                      </Field.Root> */}
                    </Stack>
                  }
                  okText="Update"
                  cancelText="Cancel"
                  isLoading={isUpdating}
                  onOk={onSubmitHandler}
                  okColorPalette="blue"
                  dialogTrigger={
                    <Button
                      colorPalette="blue"
                      size="sm"
                      variant="solid"
                      onClick={() => {
                        setProductToEdit(product);
                        console.log(product);
                      }}
                    >
                      <LuPencil />
                    </Button>
                  }
                />
                <CustomDialog
                  title="Delete Product"
                  body={
                    <p>
                      Are you sure you want to delete "{product.title}"? This
                      action cannot be undone.
                    </p>
                  }
                  okText="Delete"
                  cancelText="Cancel"
                  isLoading={isDeleting}
                  onOk={() => {
                    deleteProduct(product.documentId);
                    toaster.create({
                      title: "Product deleted successfully!",
                      type: "success",
                      duration: 2000,
                    });
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
