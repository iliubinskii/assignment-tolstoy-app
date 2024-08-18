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
import type { FormEvent, ReactElement } from "react";
import type { FetchMetadataResponse } from "../schema";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { fetchMetadata } from "../api";
import { lang } from "../lang";

/**
 * URL submission form component.
 * @param props - The properties of the URL submission form component.
 * @param props.onMetadata - The callback to handle the metadata.
 * @param props.urls - The initial URLs to submit.
 * @returns The URL submission form component.
 */
export function UrlSubmissionForm({ onMetadata, urls }: Props): ReactElement {
  const [errors, setErrors] = useState<readonly string[]>([]);

  const [items, setItems] = useState<readonly Item[]>(
    urls.map(url => {
      return { url };
    })
  );

  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const [url, setUrl] = useState<string>("");

  const addUrl = (): void => {
    setItems([...items, { url }]);
    setUrl("");
  };

  const removeUrl = (index: number): void => {
    setItems(items.filter((_, i) => i !== index));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises -- Ok
    handleFormSubmission();

    /**
     * Custom handler for the form submission.
     */
    async function handleFormSubmission(): Promise<void> {
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
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit}>
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
          sx={{
            display: "flex",
            gap: 1
          }}
        >
          <TextField
            fullWidth
            label={lang.EnterUrl}
            onChange={e => {
              setUrl(e.target.value);
            }}
            value={url}
            variant="outlined"
          />
          <Button
            disabled={url.length === 0}
            onClick={addUrl}
            startIcon={<Add />}
            sx={{
              flexShrink: 0
            }}
            type="button"
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
                justifyContent: "space-between",
                transition: "color 0.3s ease"
              }}
            >
              <ListItemText primary={item.url} />
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
