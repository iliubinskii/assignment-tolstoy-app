import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { UrlSubmissionForm } from "./UrlSubmissionForm";
import { lang } from "../lang";
import { userEvent } from "@testing-library/user-event";

describe("UrlSubmissionForm", () => {
  const mockOnMetadata = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render initial initial state correctly", () => {
    render(<UrlSubmissionForm onMetadata={mockOnMetadata} urls={[]} />);

    expect(screen.getByLabelText(lang.EnterUrl)).toBeInTheDocument();
    expect(screen.getByText(lang.Add)).toBeDisabled();
    expect(screen.getByText(lang.Submit)).toBeDisabled();
  });

  it("should enable 'Add' button when URL input is not empty", async () => {
    render(<UrlSubmissionForm onMetadata={mockOnMetadata} urls={[]} />);

    const input = screen.getByLabelText(lang.EnterUrl);

    await userEvent.type(input, "http://example.com");

    expect(screen.getByText(lang.Add)).toBeEnabled();
  });

  it("should add URL to the list and resets input field", async () => {
    render(<UrlSubmissionForm onMetadata={mockOnMetadata} urls={[]} />);

    const input = screen.getByLabelText(lang.EnterUrl);

    await userEvent.type(input, "http://example.com");

    fireEvent.submit(screen.getByText(lang.Add));

    expect(screen.getByText("http://example.com")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("should show an error for an invalid URL", async () => {
    render(<UrlSubmissionForm onMetadata={mockOnMetadata} urls={[]} />);

    const input = screen.getByLabelText(lang.EnterUrl);

    await userEvent.type(input, "invalid-url");

    fireEvent.submit(screen.getByRole("button", { name: lang.Add }));

    expect(screen.getByText(lang.InvalidUrl)).toBeVisible();
  });

  it("should remove a URL from the list", () => {
    render(
      <UrlSubmissionForm
        onMetadata={mockOnMetadata}
        urls={["http://example.com"]}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: lang.RemoveUrl }));

    expect(screen.queryByText("http://example.com")).not.toBeInTheDocument();
  });
});
