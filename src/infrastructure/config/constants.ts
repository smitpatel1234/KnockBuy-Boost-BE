import { Code } from "typeorm";

export const constants ={

    Code: {
  // 1xx Informational
  CONTINUE: { code: 100, message: "Continue - The client should continue the request or ignore if request is finished" },
  SWITCHING_PROTOCOLS: { code: 101, message: "Switching Protocols - Server switching protocols as requested" },
  PROCESSING: { code: 102, message: "WebDAV: Request received but no response yet (deprecated)" },
  EARLY_HINTS: { code: 103, message: "Early Hints - Preload resources while preparing response" },

  // 2xx Success
  OK: { code: 200, message: "OK - Request succeeded" },
  CREATED: { code: 201, message: "Created - New resource created" },
  ACCEPTED: { code: 202, message: "Accepted - Request received but not yet acted upon" },
  NON_AUTHORITATIVE_INFORMATION: { code: 203, message: "Metadata not from origin server" },
  NO_CONTENT: { code: 204, message: "No Content - No response body, headers useful" },
  RESET_CONTENT: { code: 205, message: "Reset Content - Tells client to reset document" },
  PARTIAL_CONTENT: { code: 206, message: "Partial Content - Serving part of resource" },
  MULTI_STATUS: { code: 207, message: "WebDAV: Multiple status for multiple resources" },
  ALREADY_REPORTED: { code: 208, message: "WebDAV: Avoid duplicate listing in multi-bindings" },
  IM_USED: { code: 226, message: "HTTP Delta encoding - Response of instance manipulations" },

  // 3xx Redirection
  MULTIPLE_CHOICES: { code: 300, message: "Multiple possible responses" },
  MOVED_PERMANENTLY: { code: 301, message: "Resource moved permanently" },
  FOUND: { code: 302, message: "Resource temporarily moved" },
  SEE_OTHER: { code: 303, message: "Redirect to another URI using GET" },
  NOT_MODIFIED: { code: 304, message: "Resource not modified; caching purposes" },
  USE_PROXY: { code: 305, message: "Deprecated - Response must be accessed via proxy" },
  UNUSED: { code: 306, message: "Previously used; now reserved" },
  TEMPORARY_REDIRECT: { code: 307, message: "Redirect with same HTTP method" },
  PERMANENT_REDIRECT: { code: 308, message: "Permanent redirect, same method" },

  // 4xx Client errors
  BAD_REQUEST: { code: 400, message: "Bad Request - Client error, invalid request" },
  UNAUTHORIZED: { code: 401, message: "Unauthorized - Authentication required" },
  PAYMENT_REQUIRED: { code: 402, message: "Payment required - Rarely used" },
  FORBIDDEN: { code: 403, message: "Forbidden - Client has no access rights" },
  NOT_FOUND: { code: 404, message: "Not Found - Resource does not exist" },
  METHOD_NOT_ALLOWED: { code: 405, message: "HTTP method not allowed" },
  NOT_ACCEPTABLE: { code: 406, message: "Content not acceptable per negotiation" },
  PROXY_AUTHENTICATION_REQUIRED: { code: 407, message: "Authentication needed by proxy" },
  REQUEST_TIMEOUT: { code: 408, message: "Server closes idle connection" },
  CONFLICT: { code: 409, message: "Conflict with current server state" },
  GONE: { code: 410, message: "Resource permanently deleted" },
  LENGTH_REQUIRED: { code: 411, message: "Content-Length header missing" },
  PRECONDITION_FAILED: { code: 412, message: "Precondition not met" },
  CONTENT_TOO_LARGE: { code: 413, message: "Request body too large" },
  URI_TOO_LONG: { code: 414, message: "URI too long for server" },
  UNSUPPORTED_MEDIA_TYPE: { code: 415, message: "Media format not supported" },
  RANGE_NOT_SATISFIABLE: { code: 416, message: "Range header cannot be fulfilled" },
  EXPECTATION_FAILED: { code: 417, message: "Expectation cannot be met" },
  IM_A_TEAPOT: { code: 418, message: "I'm a teapot" },
  MISDIRECTED_REQUEST: { code: 421, message: "Request directed to wrong server" },
  UNPROCESSABLE_CONTENT: { code: 422, message: "Semantic errors in request" },
  LOCKED: { code: 423, message: "Resource is locked" },
  FAILED_DEPENDENCY: { code: 424, message: "Previous request failure" },
  TOO_EARLY: { code: 425, message: "Request may be replayed" },
  UPGRADE_REQUIRED: { code: 426, message: "Protocol upgrade required" },
  PRECONDITION_REQUIRED: { code: 428, message: "Conditional request required" },
  TOO_MANY_REQUESTS: { code: 429, message: "Rate limiting exceeded" },
  REQUEST_HEADER_FIELDS_TOO_LARGE: { code: 431, message: "Header fields too large" },
  UNAVAILABLE_FOR_LEGAL_REASONS: { code: 451, message: "Legal restriction" },

  // 5xx Server errors
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error - Server cannot handle request" },
  NOT_IMPLEMENTED: { code: 501, message: "Method not supported" },
  BAD_GATEWAY: { code: 502, message: "Gateway received invalid response" },
  SERVICE_UNAVAILABLE: { code: 503, message: "Server unavailable" },
  GATEWAY_TIMEOUT: { code: 504, message: "Gateway did not receive timely response" },
  HTTP_VERSION_NOT_SUPPORTED: { code: 505, message: "HTTP version not supported" },
  VARIANT_ALSO_NEGOTIATES: { code: 506, message: "Circular content negotiation error" },
  INSUFFICIENT_STORAGE: { code: 507, message: "Cannot store representation" },
  LOOP_DETECTED: { code: 508, message: "Infinite loop detected" },
  NOT_EXTENDED: { code: 510, message: "HTTP extension not supported" },
  NETWORK_AUTHENTICATION_REQUIRED: { code: 511, message: "Network authentication required" },
}

}