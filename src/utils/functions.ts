import { toaster } from "../components/ui/toaster-instance";
import type { IProduct } from "../interfaces";

export const addItemToShoppingCart = (items: IProduct[], product: IProduct) => {
  const existingItem = items.find(
    (item) => item.documentId === product.documentId,
  );

  if (existingItem) {
    toaster.create({
      title: `Added To Your Cart`,
      description: "Product already exists, the quantity will be increased",
      type: "success",
      duration: 2000,
    });
    return items.map((item) =>
      item.documentId === product.documentId
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item,
    );
  }

  toaster.create({
    title: `Added To Your Cart`,
    type: "success",
    duration: 2000,
  });
  return [...items, { ...product, quantity: 1 }];
};
