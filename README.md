# Astro Starter Kit: Basics

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Cloudflare

Build with `pnpm build` and publish the `dist/` directory.

`public/_redirects` is copied to `dist/_redirects` during the build. Cloudflare
Pages and Workers Static Assets use it to redirect `/personajes` and
`/personajes/` directly to `/personajes/1/` with HTTP 302, avoiding Astro's HTML
redirect page. Redeploy after changing these rules. The Astro route remains as
a fallback for local development and other static hosts.

Internal links point directly to their final destination, including the trailing
slash used by Cloudflare for directory pages. `trailingSlash: "always"` also
keeps Astro's generated pagination links consistent. The HTML fallback redirects
immediately (HTTP 301 in development; zero-delay meta refresh in the static build).

See [Cloudflare redirects](https://developers.cloudflare.com/pages/configuration/redirects/).

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
