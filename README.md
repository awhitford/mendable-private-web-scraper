# Mendable Private Web Scraper

## Why?

It is easy to configure [Mendable](https://mendable.ai) to scrape a :globe_with_meridians: **public** web site, but what if your web site is :closed_lock_with_key: **private**?

This utility is designed to scan your web site locally, and upload the content to Mendable.
It is designed for _private_ web sites where Mendable can't access.

I was inspired to build this to upload a private [Docusaurus](https://docusaurus.io) site for [Mendable Search](https://docs.mendable.ai/integrations/docusaurus).

## Usage

Configure your environment:  `.env` (or `.env.local`)
```
MENDABLE_SERVER_API_KEY=9ba...3be
OPENAI_API_KEY=sk-uT4...Pui
```

* Note that you may also need to add a bogus `NANGO_SECRET_KEY` value (because of a [bug](https://github.com/mendableai/data-connectors/issues/24)) like:
  ```
  NANGO_SECRET_KEY=IGNORE
  ```

Build the utility:  `pnpm build`

See the usage:  `pnpm scrape`

Run against a url:  `pnpm scrape http://localhost:3000/sitemap.xml`
