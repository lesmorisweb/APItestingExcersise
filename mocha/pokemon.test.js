const assert = require("node:assert/strict");
const { curlRequest } = require("../curlTesting/utils/curl");

const BASE_URL = "https://pokeapi.co/api/v2";

describe("Pokemon API Tests", function () {
    this.timeout(20000);

    describe("Test 1 - Get Pokemon by name", () => {
        it("should return the correct Pokemon data for Pikachu", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);

            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pikachu");
            assert.strictEqual(response.body.id, 25);
        });

        it("should return status code 200", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);

            assert.strictEqual(response.statusCode, 200);
        });

        it("should return status code 404 for a non-existent Pokemon", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/nonexistentpokemon`);

            assert.strictEqual(response.statusCode, 404);
        });
    });

    describe("Test 2 - Validate Pokemon ID", () => {
        it("should return the correct ID for Pikachu", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);

            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.id, 25);
        });

        it("should return status code 200 with a valid ID", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/25`);

            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.id, 25);
        });

        it("should return status code 404 for a non-existent Pokemon ID", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/9999`);

            assert.strictEqual(response.statusCode, 404);
        });
    });
});
