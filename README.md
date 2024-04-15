# Mendable Private Web Scraper

## Why?

It is easy to configure [Mendable](https://mendable.ai) to scrape a :globe_with_meridians: **public** web site, but what if your web site is :closed_lock_with_key: **private**?

This utility is designed to scan your web site locally, and upload the content to Mendable.
It is designed for _private_ web sites where Mendable can't access.

I was inspired to build this to upload a private [Docusaurus](https://docusaurus.io) site for [Mendable Search](https://docs.mendable.ai/integrations/docusaurus).

## Configuration

Configure your environment:  `.env` (or `.env.local`)
```
MENDABLE_SERVER_API_KEY=9ba...3be
OPENAI_API_KEY=sk-uT4...Pui
NANGO_SECRET_KEY=IGNORE
```
* The `MENDABLE_SERVER_API_KEY` value may alternatively be passed as a command-line argument (`--api-key`)
* Environment variables may alternatively be configured using the command-line, like:
  ```
  export OPENAI_API_KEY=sk-uT4...Pui
  ```
* The `NANGO_SECRET_KEY` is not used, but technically a value is required by a dependent library (because of a [bug](https://github.com/mendableai/data-connectors/issues/24)) so specifying a bogus value (`IGNORE`) is a workaround

## Usage

Build the utility:  `pnpm build`

See the usage:  `pnpm scrape`

Run against a url:  `pnpm scrape http://localhost:3000/sitemap.xml`

### Known Bugs

You can ignore these messages, related to [mendableai/data-connectors#27](https://github.com/mendableai/data-connectors/issues/27):
```
Error scraping with Scraping Bee: AxiosError: Request failed with status code 400
```
