const assert = require("assert");
const http = require("http");
const app = require("./app");

const server = app.listen(0, () => {
  const { port } = server.address();

  http.get(`http://127.0.0.1:${port}/health`, (response) => {
    let body = "";

    response.setEncoding("utf8");
    response.on("data", (chunk) => {
      body += chunk;
    });
    response.on("end", () => {
      try {
        assert.strictEqual(response.statusCode, 200);
        assert.deepStrictEqual(JSON.parse(body), { status: "ok" });
        server.close(() => process.exit(0));
      } catch (error) {
        console.error(error);
        server.close(() => process.exit(1));
      }
    });
  }).on("error", (error) => {
    console.error(error);
    server.close(() => process.exit(1));
  });
});
