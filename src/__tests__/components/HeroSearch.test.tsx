import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HeroSearch from "@/components/HeroSearch";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("HeroSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search form with all fields", () => {
    render(<HeroSearch />);

    // Check for select placeholders (used as labels in compact design)
    expect(screen.getByText("Proizvodžač")).toBeInTheDocument();
    expect(screen.getByText("Model")).toBeInTheDocument();
    expect(screen.getByText("Godina od")).toBeInTheDocument();
    expect(screen.getByText("Tip goriva")).toBeInTheDocument();
    expect(screen.getByText("Vrsta mjenjača")).toBeInTheDocument();
  });

  it("should render all select components", () => {
    render(<HeroSearch />);

    // Check that comboboxes exist (5 select fields)
    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes.length).toBe(5);
  });

  it("should navigate to vehicles page when search clicked", () => {
    render(<HeroSearch />);

    // Search button shows the matching count, find the button element
    const buttons = screen.getAllByRole("button");
    // The last button in the grid is the search button
    const searchButton = buttons.find(
      (btn) => !btn.getAttribute("role")?.includes("combobox")
    );
    expect(searchButton).toBeTruthy();

    if (searchButton) {
      fireEvent.click(searchButton);
      expect(mockPush).toHaveBeenCalledWith("/vozila");
    }
  });

  it("should have five combobox selects", () => {
    render(<HeroSearch />);

    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes.length).toBe(5);
  });

  it("should display search button with vehicle count", () => {
    render(<HeroSearch />);

    // The search button shows the matching vehicle count
    const buttons = screen.getAllByRole("button");
    const searchButton = buttons.find(
      (btn) =>
        btn.getAttribute("data-slot") === "button" ||
        btn.classList.contains("bg-accent")
    );
    expect(searchButton).toBeInTheDocument();
  });

  it("should have proper container styling", () => {
    render(<HeroSearch />);

    // Check for rounded-lg container (the main wrapper)
    const container = document.querySelector(".rounded-lg");
    expect(container).toBeInTheDocument();
  });

  it("should have grid layout for form fields", () => {
    render(<HeroSearch />);

    // Check for grid container with grid-cols-2 (responsive design)
    const gridContainer = document.querySelector(".grid-cols-2");
    expect(gridContainer).toBeInTheDocument();
  });

  it("should have price range slider", () => {
    render(<HeroSearch />);

    // Check for slider elements
    const sliders = screen.getAllByRole("slider");
    expect(sliders.length).toBeGreaterThanOrEqual(1);
  });
});
