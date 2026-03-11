# Wedding Planning Website

This is a [Nuxt v4](https://nuxt.com) website designed to pull its content from the [Wedding Planning Content Management System](https://github.com/dwaring87/wedding-cms)

## Main Features

### Homepage

The website features a simple homepage with a large photo hero section containing the couple's name, wedding date, and venue along with a schedule outline and sections for any featured pages.

<img width="1233" height="2164" alt="Screenshot 2026-03-10 at 20-03-40 Marissa   David" src="https://github.com/user-attachments/assets/155237e6-c69d-417d-ac3d-27f0549f14e4" />

### Customizable Pages

The additional pages can be customized on the Content Management System, allowing the user to add and/or remove pages and fully customize their content.  The content can contain full HTML and photos from the CMS.

<img width="1034" height="1344" alt="Screenshot 2026-03-10 at 20-09-03 Marissa   David - Our Story" src="https://github.com/user-attachments/assets/b8884b40-b535-401c-9d9c-1c01c63d6883" />

### RSVPs

The website features a user-friendly RSVP page that looks up the guests using a unique invite code.  The CMS uses a [human-readable-id](https://github.com/dwaring87/directus-extension-human-readable-id) in the form of adjective-color-animal.  The guest enters this ID on the RSVP page and their guest record is displayed as a form.  They can edit their information (email address, meal choice, dietary restrictions) and set their RSVP.  The invite code can be appended to the RSVP url (`/rsvp?invite=happy-navy-cheetah`) to automatically pull up the guests information.  This URL can be used to generate unique QR codes that can be added to the invitations so guests can quickly go directly to their RSVP page.

[![Watch RSVP Demo](https://github.com/user-attachments/assets/d532d5cd-9617-4608-8c3b-b9fc1144fd45)](
https://github.com/user-attachments/assets/d378d332-f99d-427d-befc-fc47b34eca44)


## Usage

This project is designed to be used in conjuction with the [Wedding Planning Content Management System](https://github.com/dwaring87/wedding-cms) and is provided as a Docker image.  For more information on how to set up the CMS and website, visit the [wedding-docker](https://github.com/dwaring87/wedding-docker) repository.

If you don't want to use the Docker image, you can clone this repository, install the dependencies (`npm install`), build the website (`npm run build`), and serve the `dist` directory.  When running the website, you'll need to set the `NUXT_DIRECTUS_URL` and `NUXT_DIRECTUS_TOKEN` environment variables to the URL of the Directus CMS instance and Nuxt User static API token, respectively.


## Development

### Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Then start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

### Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
