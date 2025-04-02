import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";

dotenv.config()

const config = {
  liveScoresApi: process.env.LIVE_SCORES_API || "https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-livescores",
  upComingMatchesApi: process.env.UPCOMING_MATCHES_API || "https://free-cricbuzz-cricket-api.p.rapidapi.com/cricket-schedule",
  rapidApiKey: process.env.RAPIDAPI_KEY || "" ,
};

const server = new Server({
  name: "scores-mcp",
  version: "1.0.0",
}, {
  capabilities: {
    tools: {}
  }
});

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [{
        name: "livescores_json",
        description: "Returns data about live cricket scores",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number" }
          },
          required: []
        }
      },
      {
        name: "upcomingmatches_json",
        description: "Returns data about upcoming cricket matches",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "number" }
          },
          required: []
        }
      }]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "livescores_json") {
    try {
      const response = await fetch(config.liveScoresApi, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-rapidapi-key': config.rapidApiKey,
        }
      });

      if (!response.ok) {
        throw new McpError(ErrorCode.InternalError, `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        toolResult: data
      }
    } catch (e) {
      throw new McpError(ErrorCode.InternalError, "Something went wrong");
    }
  } else if (request.params.name === "upcomingmatches_json") {
    try {
      const response = await fetch(config.upComingMatchesApi, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-rapidapi-key': config.rapidApiKey,
        }
      });

      if (!response.ok) {
        throw new McpError(ErrorCode.InternalError, `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        toolResult: data
      }
    } catch (e) {
      throw new McpError(ErrorCode.InternalError, "Something went wrong");
    }
  }

  throw new McpError(ErrorCode.InvalidRequest, "Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);