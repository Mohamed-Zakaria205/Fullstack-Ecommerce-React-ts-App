import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import type { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setCartDrawerAction } from "../app/features/global/globalSlice";
import CartDrawerItem from "./CartDrawerItem";

const CartDrawer = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isCartDrawerOpen } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  return (
    <Drawer.Root
      open={isCartDrawerOpen}
      onOpenChange={(e) => dispatch(setCartDrawerAction(e.open))}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Your Shopping Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {items.map((item) => (
                <CartDrawerItem key={item.documentId} product={item} />
              ))}
            </Drawer.Body>
            <Drawer.Footer>
              <Button
                variant="outline"
                border="1px solid red.400"
                color="red.400"
              >
                Clear All
              </Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CartDrawer;
