import { client, urlFor } from "./client";
import {
  allVozilaQuery,
  ekskluzivnaVozilaQuery,
  istaknutaVozilaQuery,
  voziloBySlugQuery,
  allVozilaSlugQuery,
} from "./queries";
import type { Vozilo } from "@/types/vozilo";

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

interface SanityVozilo {
  _id: string;
  id: string;
  marka: string;
  model: string;
  godina: number;
  cijena: number;
  staracijena?: number;
  kilometraza: number;
  gorivo: "benzin" | "dizel" | "hibrid" | "elektricni";
  mjenjac: "rucni" | "automatski";
  snaga: number;
  boja: string;
  opis: string;
  slike: SanityImage[];
  karakteristike: string[];
  istaknuto: boolean;
  ekskluzivno?: boolean;
  datumObjave: string;
}

/**
 * Transform Sanity vehicle data to match existing Vozilo interface
 */
function transformVozilo(sanityVozilo: SanityVozilo): Vozilo {
  return {
    id: sanityVozilo.id,
    marka: sanityVozilo.marka,
    model: sanityVozilo.model,
    godina: sanityVozilo.godina,
    cijena: sanityVozilo.cijena,
    staracijena: sanityVozilo.staracijena,
    kilometraza: sanityVozilo.kilometraza,
    gorivo: sanityVozilo.gorivo,
    mjenjac: sanityVozilo.mjenjac,
    snaga: sanityVozilo.snaga,
    boja: sanityVozilo.boja,
    opis: sanityVozilo.opis,
    // Transform Sanity images to URLs
    slike:
      sanityVozilo.slike?.map((img) =>
        urlFor(img).width(1200).quality(85).url()
      ) || [],
    karakteristike: sanityVozilo.karakteristike || [],
    istaknuto: sanityVozilo.istaknuto,
    ekskluzivno: sanityVozilo.ekskluzivno,
    datumObjave: sanityVozilo.datumObjave,
  };
}

/**
 * Fetch all vehicles from Sanity
 */
export async function getVozilaFromSanity(): Promise<Vozilo[]> {
  const vehicles = await client.fetch<SanityVozilo[]>(allVozilaQuery);
  return vehicles.map(transformVozilo);
}

/**
 * Fetch exclusive vehicles from Sanity
 */
export async function getEkskluzivnaVozilaFromSanity(): Promise<Vozilo[]> {
  const vehicles = await client.fetch<SanityVozilo[]>(ekskluzivnaVozilaQuery);
  return vehicles.map(transformVozilo);
}

/**
 * Fetch featured vehicles from Sanity
 */
export async function getIstaknutaVozilaFromSanity(): Promise<Vozilo[]> {
  const vehicles = await client.fetch<SanityVozilo[]>(istaknutaVozilaQuery);
  return vehicles.map(transformVozilo);
}

/**
 * Fetch a single vehicle by slug
 */
export async function getVoziloBySlug(slug: string): Promise<Vozilo | null> {
  const vehicle = await client.fetch<SanityVozilo | null>(voziloBySlugQuery, {
    slug,
  });
  return vehicle ? transformVozilo(vehicle) : null;
}

/**
 * Get all vehicle slugs for static generation
 */
export async function getAllVozilaSlugs(): Promise<string[]> {
  return client.fetch<string[]>(allVozilaSlugQuery);
}
