import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import type { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setCartDrawerAction } from "../app/features/global/globalSlice";
// import { useState } from "react";

const CartDrawer = () => {
  // const [open, setOpen] = useState(false);
  const { isCartDrawerOpen } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  return (
    <Drawer.Root
      open={isCartDrawerOpen}
      onOpenChange={(e) => dispatch(setCartDrawerAction(e.open))}
    >
      {/* <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Drawer
        </Button>
      </Drawer.Trigger> */}
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
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
