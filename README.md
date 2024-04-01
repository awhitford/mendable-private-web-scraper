# Mendable Private Web Scraper

## Why?

It is easy to configure [Mendable](https://mendable.ai) to scrape a :globe_with_meridians: **public** web site, but what if your web site is :closed_lock_with_key: **private**?

This utility is designed to scan your web site locally, and upload the content to Mendable.
It is designed for _private_ web sites where Mendable can't access.

I was inspired to build this to upload a private [Docusaurus](https://docusaurus.io) site for [Mendable Search](https://docs.mendable.ai/integrations/docusaurus).

## Usage

Build the utility:  `pnpm build`

See the usage:  `pnpm scrape`

Run against a url:  `pnpm scrape http://localhost:3000/sitemap.xml`
