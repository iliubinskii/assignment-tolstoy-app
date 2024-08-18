import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
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
  return (
    <>
      <List>
        {metadata.map((item, index) => (
          <ListItem alignItems="flex-start" divider key={index}>
            {"errorCode" in item ? (
              <ListItemText
                primary={lang.ErrorFetchingMetadata}
                secondary={
                  <>
                    <Typography color="error" variant="body2">
                      {item.errorMessage}
                    </Typography>
                    <Typography color="textSecondary" variant="caption">
                      {item.url}
                    </Typography>
                  </>
                }
              />
            ) : (
              <Box alignItems="center" display="flex">
                {item.imageUrl && (
                  <Box mr={2}>
                    <img
                      alt={item.title ?? lang.Image}
                      src={item.imageUrl}
                      style={{ height: 20, objectFit: "contain", width: 20 }}
                    />
                  </Box>
                )}
                <ListItemText
                  primary={item.title ?? item.url}
                  secondary={
                    <>
                      {item.description && (
                        <Typography variant="body2">
                          {item.description}
                        </Typography>
                      )}
                      <Typography color="textSecondary" variant="caption">
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
