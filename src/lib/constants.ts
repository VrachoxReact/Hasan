/**
 * Produkt Auto Contact Information
 * Single source of truth for all contact details
 */

export const CONTACT = {
  phone: "+385 91 234 5678",
  phoneRaw: "+385912345678",
  email: "info@produktauto.hr",
  address: {
    street: "Ulica grada Vukovara 271",
    city: "Zagreb",
    postalCode: "10000",
    country: "Hrvatska",
    full: "Ulica grada Vukovara 271, 10000 Zagreb, Hrvatska",
  },
  whatsapp: {
    number: "385912345678",
    url: "https://wa.me/385912345678",
    messageUrl: (message: string) =>
      `https://wa.me/385912345678?text=${encodeURIComponent(message)}`,
  },
  social: {
    facebook: "https://facebook.com/produktauto",
    instagram: "https://instagram.com/produktauto",
    youtube: "https://youtube.com/@produktauto",
  },
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.5024881073784!2d15.9819711!3d45.8014399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4765d6f5f5555555%3A0x5555555555555555!2sUlica%20grada%20Vukovara%20271%2C%2010000%2C%20Zagreb!5e0!3m2!1shr!2shr!4v1701874800000!5m2!1shr!2shr",
    directionsUrl: "https://maps.google.com/?q=Ulica+grada+Vukovara+271+Zagreb",
  },
  geo: {
    latitude: 45.8014399,
    longitude: 15.9819711,
  },
} as const;

export const WORKING_HOURS = {
  weekdays: { open: "08:00", close: "18:00", label: "Ponedjeljak - Petak" },
  saturday: { open: "09:00", close: "14:00", label: "Subota" },
  sunday: { closed: true, label: "Nedjelja" },
} as const;

export const COMPANY = {
  name: "Produkt Auto",
  tagline: "Vaš pouzdani partner za kvalitetna vozila",
  description:
    "Vaš pouzdani partner za kupnju kvalitetnih rabljenih vozila. Više od 10 godina iskustva u prodaji automobila s jamstvom kvalitete.",
  founded: 2014,
} as const;
