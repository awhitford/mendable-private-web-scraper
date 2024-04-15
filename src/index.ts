import { program, Option } from "commander"
import { config } from "dotenv"

let verboseLogging = false

function verboseLog(message?: any, ...optionalParams: any[]) {
  if (verboseLogging) {
    console.log(message, optionalParams)
  }
}

program
  .name("mendable-private-web-scraper")
  .summary("Scrape a website and upload the content to Mendable.")
  .description("CLI to scrape a website and upload the content to Mendable.")
  .usage("<url...>")
  .argument("<url...>", "URL(s) of the website(s) to scrape")
  .addOption(
    new Option("--api_key <api_key>", "Mendable Server API Key for uploading sources").env("MENDABLE_SERVER_API_KEY"),
  )
  .option("--verbose", "Enable verbose logging", false)
  .showHelpAfterError()
  .parse()

const options = program.opts()
verboseLogging = options.verbose

config({
  debug: verboseLogging,
  path: [".env.local", ".env"],
})

const mendable_server_api_key = options.api_key ?? process.env.MENDABLE_SERVER_API_KEY
if (!mendable_server_api_key) {
  console.error("Missing Mendable Server Key")
  console.error(
    " - Either pass it as an argument --api_key or set it in the environment variable MENDABLE_SERVER_API_KEY",
  )
  process.exit(1)
}

// Lazy load this import:
//   import { createDataConnector } from "@mendable/data-connectors"
// because environment variables need to be set before initializing the module.
const mendableDataConnectorsModule = await import("@mendable/data-connectors")
const createDataConnector = mendableDataConnectorsModule.createDataConnector

const webDataConnector = createDataConnector({
  provider: "web-scraper",
})
webDataConnector.setOptions({
  urls: program.args,
  mode: "sitemap",
})

verboseLog("Scraping data from", program.args)
const documents = await webDataConnector.getDocuments()
verboseLog(documents)

const mendableDocuments = documents.map((doc) => {
  return {
    content: doc.content,
    source: doc.metadata.sourceURL,
    metadata: doc.metadata,
  }
})

verboseLog("Sending documents to Mendable...")
const response = await fetch("https://api.mendable.ai/v1/ingestDocuments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    api_key: mendable_server_api_key,
    documents: mendableDocuments,
  }),
})

verboseLog("Done!", response)
