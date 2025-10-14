import request from "supertest";
import app from "../app";

describe("User API", () => {
  it("GET /api/users should return users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
