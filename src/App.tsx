import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from "@mui/material";
import type { FormEvent, ReactElement } from "react";
import React, { useState } from "react";
import { lang } from "./lang";

/**
 * The main component of the application.
 * @returns The main component of the application.
 */
function App(): ReactElement {
  const [url, setUrl] = useState<string>("");

  const [urls, setUrls] = useState<readonly string[]>([]);

  const addUrl = (): void => {
    setUrls([...urls, url]);
    setUrl("");
  };

  const removeUrl = (index: number): void => {
    setUrls(urls.filter((_, i) => i !== index));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          overflow: "hidden",
          width: "100%"
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            padding: {
              sm: "40px",
              xs: "20px"
            },
            width: "100vw"
          }}
        >
          <Container
            component="form"
            maxWidth="sm"
            onSubmit={onSubmit}
            sx={{
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: 3,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              minHeight: {
                sm: 0,
                xs: "calc(100vh - 40px)"
              },
              padding: 4
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontSize: "2rem",
                fontWeight: 400
              }}
              textAlign="center"
              variant="h1"
            >
              {lang.MetadataExtractionTool}
            </Typography>
            <Typography paragraph textAlign="center" variant="body1">
              {lang.instructions}
            </Typography>
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
                {urls.map((addedUrl, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <ListItemText primary={addedUrl} />
                    <IconButton
                      aria-label={lang.RemoveUrl}
                      edge="end"
                      onClick={() => {
                        removeUrl(index);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              <Button
                color="primary"
                disabled={urls.length === 0}
                size="large"
                type="submit"
                variant="contained"
              >
                {lang.Submit}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default App;
