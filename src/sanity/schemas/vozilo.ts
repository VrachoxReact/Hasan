import { defineType, defineField } from "sanity";

export default defineType({
  name: "vozilo",
  title: "Vozilo",
  type: "document",
  groups: [
    { name: "osnovni", title: "Osnovni podaci", default: true },
    { name: "tehnika", title: "Tehnički podaci" },
    { name: "slike", title: "Slike" },
    { name: "dodatno", title: "Dodatno" },
  ],
  fields: [
    defineField({
      name: "marka",
      title: "Marka",
      type: "string",
      group: "osnovni",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          "Audi",
          "BMW",
          "Citroën",
          "DS",
          "Ford",
          "Kia",
          "Mercedes-Benz",
          "Nissan",
          "Opel",
          "Peugeot",
          "Renault",
          "Seat",
          "Škoda",
          "Toyota",
          "Volkswagen",
        ],
      },
    }),
    defineField({
      name: "model",
      title: "Model",
      type: "string",
      group: "osnovni",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "osnovni",
      options: {
        source: (doc) => `${doc.marka}-${doc.model}`.toLowerCase(),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "godina",
      title: "Godina proizvodnje",
      type: "number",
      group: "osnovni",
      validation: (Rule) => Rule.required().min(1990).max(2026),
    }),
    defineField({
      name: "cijena",
      title: "Cijena (€)",
      type: "number",
      group: "osnovni",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "staracijena",
      title: "Stara cijena (€)",
      type: "number",
      group: "osnovni",
      description: "Ostavite prazno ako nema popusta",
    }),
    defineField({
      name: "kilometraza",
      title: "Kilometraža",
      type: "number",
      group: "tehnika",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "gorivo",
      title: "Gorivo",
      type: "string",
      group: "tehnika",
      options: {
        list: [
          { title: "Benzin", value: "benzin" },
          { title: "Dizel", value: "dizel" },
          { title: "Hibrid", value: "hibrid" },
          { title: "Električni", value: "elektricni" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mjenjac",
      title: "Mjenjač",
      type: "string",
      group: "tehnika",
      options: {
        list: [
          { title: "Ručni", value: "rucni" },
          { title: "Automatski", value: "automatski" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "snaga",
      title: "Snaga (kW)",
      type: "number",
      group: "tehnika",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "boja",
      title: "Boja",
      type: "string",
      group: "tehnika",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "opis",
      title: "Opis",
      type: "text",
      group: "dodatno",
      rows: 4,
    }),
    defineField({
      name: "slike",
      title: "Slike vozila",
      type: "array",
      group: "slike",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alt tekst (za pristupačnost)",
              type: "string",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "karakteristike",
      title: "Karakteristike / Oprema",
      type: "array",
      group: "dodatno",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "istaknuto",
      title: "Istaknuto vozilo",
      type: "boolean",
      group: "dodatno",
      initialValue: false,
      description: "Prikazuje se na početnoj stranici",
    }),
    defineField({
      name: "ekskluzivno",
      title: "Ekskluzivna ponuda",
      type: "boolean",
      group: "dodatno",
      initialValue: false,
      description:
        "Prikazuje se u Ekskluzivna Ponuda sekciji s posebnim stilom",
    }),
    defineField({
      name: "datumObjave",
      title: "Datum objave",
      type: "datetime",
      group: "dodatno",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "model",
      subtitle: "marka",
      media: "slike.0",
      cijena: "cijena",
      ekskluzivno: "ekskluzivno",
    },
    prepare({ title, subtitle, media, cijena, ekskluzivno }) {
      return {
        title: `${subtitle} ${title}${ekskluzivno ? " ⭐" : ""}`,
        subtitle: cijena ? `${cijena.toLocaleString("hr-HR")} €` : "",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Najnovije",
      name: "datumDesc",
      by: [{ field: "datumObjave", direction: "desc" }],
    },
    {
      title: "Cijena (niža prvo)",
      name: "cijenaAsc",
      by: [{ field: "cijena", direction: "asc" }],
    },
    {
      title: "Cijena (viša prvo)",
      name: "cijenaDesc",
      by: [{ field: "cijena", direction: "desc" }],
    },
    {
      title: "Marka A-Z",
      name: "markaAsc",
      by: [{ field: "marka", direction: "asc" }],
    },
  ],
});
