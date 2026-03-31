import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface CustomDialogProps {
  dialogTrigger: ReactNode;
  title?: string;
  body?: ReactNode;
  cancelText?: string;
  okText?: string;
  onOk?: () => void;
  isLoading?: boolean;
  okColorPalette?: string;
}

const CustomDialog = ({
  dialogTrigger,
  title = "Dialog Title",
  body = "Are you sure you want to perform this action?",
  cancelText = "Cancel",
  okText = "Save",
  onOk,
  isLoading,
  okColorPalette = "red",
}: CustomDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{dialogTrigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop
          backdropFilter="auto"
          backdropBlur="sm"
          bg="blackAlpha.600"
        />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{body}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">{cancelText}</Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={onOk}
                  loading={isLoading}
                  colorPalette={okColorPalette}
                >
                  {okText}
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CustomDialog;
