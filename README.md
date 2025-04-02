# MCP Server

This is a Model Context Protocol server example project that provides live cricket scores and upcoming match data using the Cricbuzz API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Blog](#blog)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/scores-mcp.git
   cd scores-mcp
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the server, run the following command:

```bash
npm run prepare
```

This will build the project and start the MCP server.

## Configuration

The project uses environment variables for configuration. Create a `.env` file in the root directory and add the following variables:

```env
LIVE_SCORES_API=https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-livescores
UPCOMING_MATCHES_API=https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-schedule
RAPIDAPI_KEY=your_rapidapi_key
```

Replace `your_rapidapi_key` with your actual RapidAPI key.

## Scripts

- `npm run build`: Compiles the TypeScript code into JavaScript.
- `npm run prepare`: Builds the project and sets the necessary permissions.
- `npm run watch`: Watches for changes and recompiles the TypeScript code.
- `npm run inspector`: Runs the MCP inspector on the build output.

## Dependencies

- `@modelcontextprotocol/sdk`: MCP SDK for server and transport.
- `dotenv`: Loads environment variables from a `.env` file.
- `node-fetch`: A lightweight module that brings `window.fetch` to Node.js.

## Dev Dependencies

- `@types/dotenv`: TypeScript definitions for dotenv.
- `@types/node`: TypeScript definitions for Node.js.
- `typescript`: TypeScript language support.
