import { Add, Delete } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import type { ChangeEventHandler, FormEventHandler, ReactElement } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import type { FetchMetadataResponse } from "../schema";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { fetchMetadata } from "../api";
import { lang } from "../lang";
import zod from "zod";

/**
 * URL submission form component.
 * @param props - The properties of the URL submission form component.
 * @param props.onMetadata - The callback to handle the metadata.
 * @param props.urls - The initial URLs to submit.
 * @returns The URL submission form component.
 */
export function UrlSubmissionForm({ onMetadata, urls }: Props): ReactElement {
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const [errors, setErrors] = useState<readonly string[]>([]);

  const [invalidUrl, setInvalidUrl] = useState(false);

  const [items, setItems] = useState<readonly Item[]>(
    urls.map(url => {
      return { url };
    })
  );

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const [url, setUrl] = useState<string>("");

  const removeUrl = (index: number): void => {
    setItems(items.filter((_, i) => i !== index));
  };

  const urlChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = e => {
    setUrl(e.target.value);

    if (
      invalidUrl &&
      (e.target.value === "" ||
        UrlValidationSchema.safeParse(e.target.value).success)
    )
      setInvalidUrl(false);
  };

  const urlSubmitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    const parsed = UrlValidationSchema.safeParse(url);

    if (parsed.success) {
      setItems([...items, { url }]);
      setUrl("");
      setInvalidUrl(false);
    } else setInvalidUrl(true);
  };

  const submitUrls = async (): Promise<void> => {
    setUrl("");
    setInvalidUrl(false);
    setLoading(true);

    try {
      const response = await fetchMetadata(items.map(item => item.url));

      if (response)
        if ("errorCode" in response)
          if ("details" in response && response.details) {
            const { details } = response;

            setErrors(details.formErrors);
            setItems(prev =>
              prev.map((item, index) => {
                return {
                  ...item,
                  errors: details.fieldErrors[index]
                };
              })
            );
          } else {
            setErrors([lang.ServiceIsTemporarilyUnavailable]);
            setItems(prev =>
              prev.map(item => {
                return { url: item.url };
              })
            );
          }
        else
          onMetadata(
            items.map(item => item.url),
            response
          );
      else {
        setErrors([lang.ServiceIsTemporarilyUnavailable]);
        setItems(prev =>
          prev.map(item => {
            return { url: item.url };
          })
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (url.length > 0) setConfirmationDialogOpen(true);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Ok
    else submitUrls();
  };

  return (
    <>
      <Box>
        <Typography paragraph textAlign="center" variant="body1">
          {lang.instructions}
        </Typography>
        {errors.length > 0 && (
          <Box mb={2}>
            {errors.map((error, index) => (
              <Alert key={index} severity="error">
                {error}
              </Alert>
            ))}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
          }}
        >
          <Box
            component="form"
            onSubmit={urlSubmitHandler}
            sx={{
              display: "flex",
              gap: 1
            }}
          >
            <TextField
              FormHelperTextProps={{
                sx: {
                  bottom: 0,
                  left: 0,
                  maxHeight: invalidUrl ? "30px" : "0",
                  overflow: "hidden",
                  position: "absolute",
                  transform: "translateY(100%)",
                  transition: "max-height 0.3s ease"
                }
              }}
              disabled={loading}
              error={invalidUrl}
              fullWidth
              helperText={lang.InvalidUrl}
              label={lang.EnterUrl}
              onChange={urlChangeHandler}
              value={url}
              variant="outlined"
            />
            <Button
              disabled={url.length === 0 || loading}
              startIcon={<Add />}
              sx={{
                flexShrink: 0
              }}
              type="submit"
              variant="outlined"
            >
              {lang.Add}
            </Button>
          </Box>
          <List>
            {items.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  color: item.errors ? theme.palette.error.main : undefined,
                  display: "flex",
                  gap: 1,
                  justifyContent: "space-between",
                  transition: "color 0.3s ease"
                }}
              >
                <ListItemText
                  primary={item.url}
                  primaryTypographyProps={{
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }
                  }}
                />
                <IconButton
                  aria-label={lang.RemoveUrl}
                  disabled={loading}
                  edge="end"
                  onClick={() => {
                    removeUrl(index);
                  }}
                  sx={{
                    color: "inherit"
                  }}
                >
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Button
              color="primary"
              disabled={items.length === 0 || loading}
              size="large"
              startIcon={
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    width: 20
                  }}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <SendIcon
                      sx={{
                        fontSize: 20
                      }}
                    />
                  )}
                </Box>
              }
              type="submit"
              variant="contained"
            >
              {lang.Submit}
            </Button>
          </Box>
        </Box>
      </Box>
      <ConfirmationDialog
        cancelText={lang.Cancel}
        confirmText={lang.Continue}
        isOpen={confirmationDialogOpen}
        message={lang.DiscardInputMessage}
        onCancel={() => {
          setConfirmationDialogOpen(false);
        }}
        onConfirm={() => {
          setConfirmationDialogOpen(false);

          // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Ok
          submitUrls();
        }}
        title={lang.DiscardInput}
      />
    </>
  );
}

export interface Props {
  readonly onMetadata: (
    urls: readonly string[],
    metadata: readonly FetchMetadataResponse[]
  ) => void;
  readonly urls: readonly string[];
}

interface Item {
  readonly errors?: readonly string[] | undefined;
  readonly url: string;
}

const UrlValidationSchema = zod.string().url();
