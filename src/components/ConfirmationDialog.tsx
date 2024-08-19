import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  keyframes
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
  const SHAKE_ANIMATION_DURATION = 300;

  const [shakeEffect, setShakeEffect] = useState(false);

  useEffect(() => {
    if (shakeEffect) {
      const timeout = setTimeout(() => {
        setShakeEffect(false);
      }, SHAKE_ANIMATION_DURATION);

      return () => {
        clearTimeout(timeout);
      };
    }

    return undefined;
  }, [shakeEffect]);

  return (
    <Dialog
      PaperProps={{
        sx: {
          animation: shakeEffect ? `${shake} 0.3s` : "none",
          maxWidth: "400px"
        }
      }}
      onClose={() => {
        setShakeEffect(true);
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

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;
