import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VoziloCard from "@/components/VoziloCard";
import { useUsporediStore } from "@/stores/usporediStore";
import { useFavoritiStore } from "@/stores/favoritiStore";
import type { Vozilo } from "@/types/vozilo";

// Mock stores
vi.mock("@/stores/usporediStore");
vi.mock("@/stores/favoritiStore");

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockVozilo: Vozilo = {
  id: "test-1",
  marka: "BMW",
  model: "3 Series",
  godina: 2020,
  cijena: 35000,
  staracijena: 40000,
  kilometraza: 50000,
  gorivo: "dizel",
  mjenjac: "automatski",
  snaga: 140,
  boja: "Crna",
  opis: "Test vehicle description",
  slike: ["https://example.com/image1.jpg"],
  istaknuto: true,
  ekskluzivno: true,
  datumObjave: "2024-01-01",
  karakteristike: ["LED svjetla", "Kožna sjedala"],
};

describe("VoziloCard", () => {
  const mockAddVozilo = vi.fn();
  const mockRemoveVozilo = vi.fn();
  const mockIsInList = vi.fn();
  const mockToggleFavorit = vi.fn();
  const mockIsFavorit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useUsporediStore as any).mockReturnValue({
      addVozilo: mockAddVozilo,
      removeVozilo: mockRemoveVozilo,
      isInList: mockIsInList,
    });

    (useFavoritiStore as any).mockReturnValue({
      toggleFavorit: mockToggleFavorit,
      isFavorit: mockIsFavorit,
    });

    mockIsInList.mockReturnValue(false);
    mockIsFavorit.mockReturnValue(false);
  });

  it("should render vehicle information correctly", () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    expect(screen.getByText("BMW 3 Series")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
    expect(screen.getByText(/35\.000/)).toBeInTheDocument();
    expect(screen.getByText(/50\.000 km/)).toBeInTheDocument();
  });

  it("should display exclusive badge when ekskluzivno is true", () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    expect(screen.getByText(/Ekskluzivno/i)).toBeInTheDocument();
  });

  it("should display old price when staracijena is provided", () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    expect(screen.getByText(/40\.000/)).toBeInTheDocument();
  });

  it("should call addVozilo when compare button clicked and vehicle not in list", () => {
    mockAddVozilo.mockReturnValue(true);
    render(<VoziloCard vozilo={mockVozilo} />);

    const compareButton = screen.getByLabelText(/Dodaj u usporedbu/i);
    fireEvent.click(compareButton);

    expect(mockAddVozilo).toHaveBeenCalledWith(mockVozilo);
  });

  it("should call removeVozilo when compare button clicked and vehicle in list", () => {
    mockIsInList.mockReturnValue(true);
    render(<VoziloCard vozilo={mockVozilo} />);

    const compareButton = screen.getByLabelText(/Ukloni iz usporedbe/i);
    fireEvent.click(compareButton);

    expect(mockRemoveVozilo).toHaveBeenCalledWith(mockVozilo.id);
  });

  it("should call toggleFavorit when favorite button clicked", () => {
    mockToggleFavorit.mockReturnValue(true);
    render(<VoziloCard vozilo={mockVozilo} />);

    const favoriteButton = screen.getByLabelText(/Dodaj u favorite/i);
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorit).toHaveBeenCalledWith(mockVozilo);
  });

  it("should show different icon when vehicle is in favorites", () => {
    mockIsFavorit.mockReturnValue(true);
    render(<VoziloCard vozilo={mockVozilo} />);

    const favoriteButton = screen.getByLabelText(/Ukloni iz favorita/i);
    expect(favoriteButton).toBeInTheDocument();
  });

  it("should display gorivo label correctly", () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    expect(screen.getByText("Dizel")).toBeInTheDocument();
  });

  it("should display mjenjac label correctly", () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    expect(screen.getByText("Automatski")).toBeInTheDocument();
  });

  it("should navigate to detail page when card is clicked", () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/vozila/test-1");
  });

  it("should handle image loading state", async () => {
    render(<VoziloCard vozilo={mockVozilo} />);

    const image = screen.getByAltText(/BMW 3 Series/i);
    expect(image).toBeInTheDocument();
  });
});
