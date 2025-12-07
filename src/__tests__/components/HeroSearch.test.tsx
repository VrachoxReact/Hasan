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

    // Check for labels
    expect(screen.getByText("Marka")).toBeInTheDocument();
    expect(screen.getByText("Godina od")).toBeInTheDocument();
    expect(screen.getByText("Cijena")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Pretraži/i })
    ).toBeInTheDocument();
  });

  it("should render all select placeholders", () => {
    render(<HeroSearch />);

    expect(screen.getByText("Sve marke")).toBeInTheDocument();
    // "Bilo koja" appears twice (for godina and cijena)
    expect(screen.getAllByText("Bilo koja").length).toBe(2);
  });

  it("should navigate to vehicles page when search clicked", () => {
    render(<HeroSearch />);

    const searchButton = screen.getByRole("button", { name: /Pretraži/i });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/vozila");
  });

  it("should have three combobox selects", () => {
    render(<HeroSearch />);

    const comboboxes = screen.getAllByRole("combobox");
    expect(comboboxes.length).toBe(3);
  });

  it("should display search button with icon", () => {
    render(<HeroSearch />);

    const searchButton = screen.getByRole("button", { name: /Pretraži/i });
    expect(searchButton).toBeInTheDocument();

    // Check for search icon
    const searchIcon = document.querySelector(".lucide-search");
    expect(searchIcon).toBeInTheDocument();
  });

  it("should have proper styling classes", () => {
    render(<HeroSearch />);

    // Check for backdrop blur container
    const container = document.querySelector(".backdrop-blur-xl");
    expect(container).toBeInTheDocument();
  });

  it("should have grid layout for form fields", () => {
    render(<HeroSearch />);

    // Check for grid container
    const gridContainer = document.querySelector(".grid-cols-1");
    expect(gridContainer).toBeInTheDocument();
  });
});
