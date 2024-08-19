import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import React from "react";
import type { ReactElement } from "react";

/**
 * Confirmation dialog component.
 * @param props - The properties of the confirmation dialog component.
 * @param props.cancelText - The text for the cancel button.
 * @param props.confirmText - The text for the confirm button.
 * @param props.isOpen - Whether the dialog is open.
 * @param props.message - The message to display.
 * @param props.onCancel - The callback to handle the cancel action.
 * @param props.onConfirm - The callback to handle the confirm action.
 * @param props.title - The title of the dialog.
 * @returns The confirmation dialog component.
 */
export function ConfirmationDialog({
  cancelText,
  confirmText,
  isOpen,
  message,
  onCancel,
  onConfirm,
  title
}: Props): ReactElement {
  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: "400px"
        }
      }}
      open={isOpen}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onCancel} variant="outlined">
          {cancelText}
        </Button>
        <Button color="error" onClick={onConfirm} variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface Props {
  readonly cancelText: string;
  readonly confirmText: string;
  readonly isOpen: boolean;
  readonly message: string;
  readonly onCancel: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
}
