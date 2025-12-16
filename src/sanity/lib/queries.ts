import { groq } from "next-sanity";

// Base projection for vehicle data
const voziloProjection = `
  _id,
  "id": slug.current,
  marka,
  model,
  godina,
  cijena,
  staracijena,
  kilometraza,
  gorivo,
  mjenjac,
  snaga,
  boja,
  opis,
  slike,
  karakteristike,
  istaknuto,
  ekskluzivno,
  datumObjave
`;

/**
 * Get all vehicles, sorted by date (newest first)
 */
export const allVozilaQuery = groq`
  *[_type == "vozilo"] | order(datumObjave desc) {
    ${voziloProjection}
  }
`;

/**
 * Get exclusive vehicles only
 */
export const ekskluzivnaVozilaQuery = groq`
  *[_type == "vozilo" && ekskluzivno == true] | order(datumObjave desc) {
    ${voziloProjection}
  }
`;

/**
 * Get featured vehicles only
 */
export const istaknutaVozilaQuery = groq`
  *[_type == "vozilo" && istaknuto == true] | order(datumObjave desc) {
    ${voziloProjection}
  }
`;

/**
 * Get a single vehicle by slug
 */
export const voziloBySlugQuery = groq`
  *[_type == "vozilo" && slug.current == $slug][0] {
    ${voziloProjection}
  }
`;

/**
 * Get vehicles with filters (for advanced filtering)
 */
export const filteredVozilaQuery = groq`
  *[_type == "vozilo"
    && ($marka == "" || marka == $marka)
    && ($gorivo == "" || gorivo == $gorivo)
    && ($mjenjac == "" || mjenjac == $mjenjac)
    && cijena >= $cijenaOd
    && cijena <= $cijenaDo
    && godina >= $godinaOd
    && godina <= $godinaDo
    && kilometraza <= $kilometrazaDo
  ] | order(datumObjave desc) {
    ${voziloProjection}
  }
`;

/**
 * Get all vehicle slugs (for static generation)
 */
export const allVozilaSlugQuery = groq`
  *[_type == "vozilo" && defined(slug.current)][].slug.current
`;

/**
 * Get vehicle count
 */
export const vozilaCountQuery = groq`
  count(*[_type == "vozilo"])
`;
