# Setup: Sanity (CMS) + Resend (Email)

Ovaj dokument opisuje kako podesiti **Sanity Studio** (admin CMS za vozila) i **Resend** (slanje e-mailova iz kontakt forme) za lokalni razvoj i produkciju.

## 0) Preduvjeti

- Node.js LTS
- Projekt je pokrenut (Next.js App Router)
- Imaš pristup DNS postavkama domene (samo za produkciju Resend domene)

---

## 1) Sanity (CMS) — projekt + env varijable

### 1.1 Kreiraj Sanity projekt

1. Otvori Sanity Manage: https://www.sanity.io/manage
2. **Create project**
3. Odaberi dataset (preporuka): `production`
4. Zapamti:
   - **Project ID**
   - **Dataset**

### 1.2 Postavi env varijable

U root-u projekta koristi `.env.local` (lokalno) i env varijable na hostingu (produkcija).

U `.env.local` dodaj (vrijednosti su primjeri):

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="tvojProjectId"
NEXT_PUBLIC_SANITY_DATASET="production"
```

Napomena:

- `.env.local` se ne commita.
- `.env.example` treba imati iste ključeve (bez tajni) za onboarding.

### 1.3 CORS (da /admin radi)

U Sanity Manage → Project → API:

- Dodaj CORS origin za lokalno (ovisno kako pokrećeš dev):
  - `http://localhost:3000`
  - `http://127.0.0.1:3000`
- Dodaj CORS origin za produkciju:
  - `https://tvoja-domena.hr`
  - `https://www.tvoja-domena.hr` (ako koristiš www)

Preporuka:

- Nemoj uključivati “Allow credentials” ako ti nije potrebno.

### 1.4 Pokreni Studio

Studio je ugrađen u aplikaciju na ruti:

- `http://localhost:3000/admin`

Ako vidiš grešku o projektu/datasetu, znači da env varijable ili CORS nisu ispravni.

---

## 2) Resend — slanje emaila iz kontakt forme

Projekt ima API rutu koja prima kontakt formu i šalje e-mail.

### 2.1 Kreiraj Resend account + API key

1. Otvori: https://resend.com
2. U dashboardu napravi **API Key**
3. U `.env.local` dodaj:

```bash
RESEND_API_KEY="re_..."
CONTACT_EMAIL="produktauto@gmail.com"
```

`CONTACT_EMAIL` je adresa na koju stižu poruke s forme.

### 2.2 (Produkcija preporuka) Verificiraj domenu

Da e-mailovi budu pouzdaniji i da možeš slati “From” s vlastite domene (npr. `info@produktauto.hr`):

1. Resend → Domains → Add domain (npr. `produktauto.hr`)
2. Dodaj DNS zapise koje Resend traži (SPF/DKIM/…)
3. Kada je verified, u kodu/konfiguraciji koristi `From` na toj domeni.

Ako domena nije verificirana, slanje može biti ograničeno ili završavati u spam-u.

### 2.3 Test (lokalno)

1. Pokreni dev server.
2. Otvori `/kontakt` i pošalji test poruku.
3. Provjeri da je stiglo na `CONTACT_EMAIL`.

Ako je `RESEND_API_KEY` prazan ili neispravan, API ruta bi trebala vratiti grešku (ili u dev modu fallback log, ovisno o implementaciji).

---

## 3) Deploy (Hostinger / bilo koji hosting)

Na hostingu postavi env varijable (u panelu ili kroz deployment settings):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`

Nakon deploya:

- Posjeti `https://tvoja-domena.hr/admin`
- Testiraj `/kontakt` slanje

---

## 4) Uvoz postojećih vozila (opcionalno, ali preporučeno)

Trenutno u repo-u postoji lokalni JSON (`src/data/vozila.json`). Da bi osoblje moglo uređivati vozila kroz CMS:

- napravi import skriptu koja mapira JSON → Sanity dokumente `vozilo`
- import se radi jednom (ili po potrebi)

Ako želiš, mogu dodati skriptu tipa `scripts/import-vozila-to-sanity.ts` i upute kako je pokrenuti.

---

## 5) Troubleshooting

**/admin se ne otvara ili baca grešku**

- Provjeri `NEXT_PUBLIC_SANITY_PROJECT_ID` i `NEXT_PUBLIC_SANITY_DATASET`
- Provjeri CORS origin u Sanity Manage

**Kontakt forma ne šalje**

- Provjeri `RESEND_API_KEY`
- Provjeri `CONTACT_EMAIL`
- Provjeri server log (Network tab + server output)

**Slike iz Sanity se ne prikazuju**

- Provjeri da `next.config.ts` dopušta `cdn.sanity.io` (remotePatterns)
