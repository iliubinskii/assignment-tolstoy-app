import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import type { ReactElement } from "react";
import { UrlSubmissionForm } from "./components";
import { lang } from "./lang";

/**
 * The main component of the application.
 * @returns The main component of the application.
 */
function App(): ReactElement {
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
            maxWidth="sm"
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
            <UrlSubmissionForm />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default App;
