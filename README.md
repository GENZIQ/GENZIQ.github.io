# GENZIQ

Building intelligent technology to solve meaningful real-world problems.

This repository contains the GENZIQ website, built with TanStack Start, React,
TypeScript, and Tailwind CSS.

## Development

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Create and serve a production build:

```sh
npm run build
npm run preview
```

## Deployment

The site can be deployed on Vercel. Import `GENZIQ/genziq` in Vercel and use
the default build settings; Vercel assigns a free `*.vercel.app` subdomain.
Pushes to the connected branch trigger new deployments.

This repository also deploys a prerendered static version to GitHub Pages from
`main` using `.github/workflows/deploy-pages.yml`. The Pages site is configured
to use `genziq.io` as its custom domain. Point the domain's apex `A` records to
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and
`185.199.111.153`. GitHub can issue the HTTPS certificate after DNS resolves.

## Mission

We aim to build technology that is innovative, useful, trustworthy, and aligned
with real human needs.

## Contact

- Organization: [GENZIQ on GitHub](https://github.com/GENZIQ)
- Email: anushree1888@gmail.com
