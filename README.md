# Saqib Nazir — DevOps portfolio

Responsive single-page portfolio for [Saqib Nazir](https://github.com/chsaqib). Built with semantic HTML, CSS, and a small JavaScript enhancement. Hosted with Cloudflare Workers Static Assets.

## Local preview

Requires Node.js 22 or later.

```sh
npm run dev
```

Open http://127.0.0.1:4173.

## Deploy

```sh
npm ci
npx wrangler login
npm run deploy
```

Cloudflare Workers Builds: connect this repository, leave the build command empty, and use `npx wrangler deploy` as the deploy command. The `dist` directory is the source of the static site and is tracked deliberately. No compilation is required.

## Update content

- `dist/index.html`: profile, projects, links, and metadata.
- `dist/style.css`: responsive layout and theme.
- `dist/portrait.jpg`: public GitHub profile portrait.
- `wrangler.jsonc`: Cloudflare Worker name and assets configuration.

## Content sources

- https://www.linkedin.com/in/chsaqibnazir/
- https://github.com/chsaqib
- Public project repositories linked on the site.

Profile reviewed 2026-09-25 from the signed-in LinkedIn profile. Work history, education, certifications, technical focus, and the approximate 100-account AWS scope reflect that profile. Terraform Associate is presented as a credential earned in August 2024, not as a claim of current certification; LinkedIn records the certification period through August 2026. The platform project distinguishes its working foundation from the broader planned architecture. Workflow visuals are explanatory diagrams, not live operational telemetry.

No forms, analytics, cookies, or tracking scripts. Google Fonts provides the typefaces; system fonts serve as fallbacks. Motion respects the device's reduced-motion preference.
