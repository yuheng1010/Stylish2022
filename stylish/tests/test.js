const request = require("supertest");
const app = require('../app.js')

describe("GET /allProducts", () => {
    test("It should respond with an array of products", async () => {
      const response = await request(app).get("/api/v1/products").query({paging:0});
      expect(JSON.parse(response.body['list']).length).toBe(6);
      expect(response.body).toHaveProperty("next_paging");
      expect(response.body).toHaveProperty("list");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("POST /signI", () => {
    test("It should respond with an token of signIn", async () => {
      const uAc='123';
      const uPa='123';
      const response = await request(app).post("/signI").send({uAc:uAc,uPa:uPa});
      expect(response.body).toHaveProperty("token");
      expect(response.statusCode).toBe(200);
    });
  });

  describe("GET /products/details/:id", () => {
    test("It should respond with the details of product", async () => {
      const response = await request(app).get("/api/v1/products/details/9")
      expect(JSON.parse(response.body['list'])[0]['pname']).toBe('男格子襯衫');
      expect(JSON.parse(response.body['list'])[0]).toHaveProperty("des_1");
      expect(response.statusCode).toBe(200);
    });

    test("It should not respond with the details of product not exist", async () => {
      const response = await request(app).get("/api/v1/products/details/10000")
      expect(JSON.parse(response.body['list'])[0]).toBeUndefined();
      expect(response.statusCode).toBe(200);
    });
  });