import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

// Mock the data-fetching hook so the component can render without real API calls.
vi.mock("../hooks/fetching/useCreateContact", () => ({
  useCreateContact: () => ({
    createContact: vi.fn(),
    error: null,
    isFetching: false,
  }),
}));

// Mock the update hook for the same reason.
vi.mock("../hooks/fetching/useUpdateContact", () => ({
  useUpdateContact: () => ({
    updateContact: vi.fn(),
    error: null,
    isFetching: false,
  }),
}));

describe("ContactForm", () => {
  it("renders new contact heading when no initial data", () => {
    // Render the form in "create" mode (no initial data).
    render(<ContactForm initialData={null} onSubmit={vi.fn()} />);

    // Assert that the heading reflects create mode.
    expect(
      screen.getByRole("heading", { name: "Nový kontakt" })
    ).toBeInTheDocument();
  });

  it("renders edit contact heading when initial data is provided", () => {
    // Render the form in "edit" mode by passing existing contact data.
    render(
      <ContactForm
        initialData={{
          _id: "1",
          firstName: "Jan",
          lastName: "Novak",
          email: "jan@example.com",
        }}
        onSubmit={vi.fn()}
      />
    );

    // Assert that the heading switches to edit mode.
    expect(
      screen.getByRole("heading", { name: "Editace kontaktu" })
    ).toBeInTheDocument();
  });
});
