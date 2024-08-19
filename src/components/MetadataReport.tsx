import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import type { FetchMetadataResponse } from "../schema";
import React from "react";
import type { ReactElement } from "react";
import { lang } from "../lang";

/**
 * Metadata report component.
 * @param props - The properties of the metadata report component.
 * @param props.metadata - The metadata to report.
 * @param props.onBack - The callback to invoke when the back button is clicked.
 * @returns The metadata report component.
 */
export function MetadataReport({ metadata, onBack }: Props): ReactElement {
  const theme = useTheme();

  return (
    <>
      <List>
        {metadata.map((item, index) => (
          <ListItem alignItems="flex-start" divider key={index}>
            {"errorCode" in item ? (
              <ListItemText
                primary={lang.ErrorFetchingMetadata}
                primaryTypographyProps={{
                  sx: {
                    color: theme.palette.error.main,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }
                }}
                secondary={
                  <>
                    <Typography
                      color="error"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                      variant="body2"
                    >
                      {item.errorMessage}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        display: "block",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                      variant="caption"
                    >
                      {item.url}
                    </Typography>
                  </>
                }
              />
            ) : (
              <Box
                alignItems="center"
                display="flex"
                sx={{
                  width: "100%"
                }}
              >
                {item.imageUrl && (
                  <Box
                    mr={2}
                    sx={{
                      flexShrink: 0,
                      height: 20,
                      overflow: "hidden",
                      width: 20
                    }}
                  >
                    <img
                      alt={item.title ?? lang.Image}
                      onError={e => {
                        e.currentTarget.src = "/no-image.png";
                      }}
                      src={item.imageUrl}
                      style={{
                        height: 20,
                        maxHeight: 20,
                        maxWidth: 20,
                        objectFit: "contain",
                        width: 20
                      }}
                    />
                  </Box>
                )}
                <ListItemText
                  primary={item.title ?? item.url}
                  primaryTypographyProps={{
                    sx: {
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }
                  }}
                  secondary={
                    <>
                      {item.description && (
                        <Typography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                          variant="body2"
                        >
                          {item.description}
                        </Typography>
                      )}
                      <Typography
                        color="textSecondary"
                        component="a"
                        href={item.url}
                        rel="noopener noreferrer"
                        sx={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                        target="_blank"
                        variant="caption"
                      >
                        {item.url}
                      </Typography>
                    </>
                  }
                />
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button color="primary" onClick={onBack} variant="contained">
          {lang.Back}
        </Button>
      </Box>
    </>
  );
}

export interface Props {
  readonly metadata: readonly FetchMetadataResponse[];
  readonly onBack: () => void;
}
