import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { lang } from "./lang";

describe("App component", () => {
  it("renders a heading", () => {
    render(<App />);

    const heading = screen.queryByText(lang.MetadataExtractionTool);

    expect(heading).toBeInTheDocument();
  });
});
