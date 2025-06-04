import { APIRequestContext } from "@playwright/test";

interface TestContext {
  request: APIRequestContext;
}

export {TestContext}