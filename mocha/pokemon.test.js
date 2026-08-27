const assert = require("assert");
const { curlRequest } = require("../curlTesting/utils/curl");

const BASE_URL = "https://pokeapi.co/api/v2";

describe("Pokemon API Tests", () => {
    describe("Test 1 - Get Pokemon by name", () => {
        it("should return the correct Pokemon data for Pikachu", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);

            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pikachu");
            assert.strictEqual(response.body.id, 25);
        });

        it("should return status code 200 with valid Pokemon data", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pidgeot`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pidgeot");
            assert.strictEqual(response.body.id, 18);
            assert.ok(response.body.weight > 0);
        });

        it("should return status code 404 for a non-existent Pokemon", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/nonexistentpokemon`);
            assert.strictEqual(response.statusCode, 404);
        });
    });

    describe("Test 2 - Validate Pokemon ID", () => {
        it("should return the correct ID for vileplume", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/vileplume`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.id, 45);
            assert.strictEqual(response.body.name, "vileplume");
            assert.ok(Array.isArray(response.body.types));
        });

        it("should return status code 200 with a valid ID", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.id, 25);
            assert.strictEqual(response.body.name, "pikachu");
            assert.ok(Array.isArray(response.body.types));
        });

        it("should return status code 404 for a non-existent Pokemon ID", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/9999`);
            assert.strictEqual(response.statusCode, 404);
        });
    });

    describe("Test 3 - Validate Pokemon Types", () => {
        it("should ensure Pikachu has exactly one type", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pikachu");
            assert.strictEqual(response.body.types.length, 1);
        });

        it("should ensure the pokemon type data is an array", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pidgeot`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pidgeot");
            assert.ok(Array.isArray(response.body.types));
        });
    });

    describe("Test 4 - Validate Pokemon Abilities", () => {
        it("should ensure the pokemon has at least one ability", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pikachu");
            assert.ok(response.body.abilities.length >= 1);
        });

        it("should ensure the pokemon abilities are stored in an array", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pidgeot`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pidgeot");
            assert.ok(Array.isArray(response.body.abilities));
        });
    });

    describe("Test 5 - Validate Pokemon Moves", () => {
        it("should ensure the pokemon has at least one move", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pikachu`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pikachu");
            assert.ok(response.body.moves.length >= 1);
        });

        it("should ensure the pokemon moves are stored in an array", async () => {
            const response = await curlRequest(`${BASE_URL}/pokemon/pidgeot`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "pidgeot");
            assert.ok(Array.isArray(response.body.moves));
        });
    });
});