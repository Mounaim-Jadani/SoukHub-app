import { backend_url, server } from "./server";

test("uses the configured API endpoints", () => {
  expect(server).toMatch(/^https?:\/\/.+\/api\/v2$/);
  expect(backend_url).toMatch(/^https?:\/\/.+\/$/);
});
