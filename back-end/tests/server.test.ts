import request from "supertest";

import server from "../server";

test("[GET] /_healthcheck", async () => {
  const res = await request(server).get("/_healthcheck");
  expect(typeof res.body.uptime).toBe("number");
});
