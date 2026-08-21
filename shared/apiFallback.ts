export function unknownApiPayload(path: string) {
  return {
    error: {
      message: `Unknown API route: ${path}`,
    },
  };
}

export function unknownTrpcPayload() {
  return {
    error: {
      message: "Unknown tRPC procedure",
    },
  };
}

export function isJsonApiPath(path: string) {
  return path.startsWith("/api/");
}

export function apiResponseContentType() {
  return "application/json; charset=utf-8";
}
