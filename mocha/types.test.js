const assert = require("assert");
const { curlRequest } = require("../curlTesting/utils/curl");

const BASE_URL = "https://pokeapi.co/api/v2";

describe("Pokemon types", function () {
    this.timeout(10000);
    describe("Test 1 - Get type by name", () => {
        it("should return the correct type data for fire", async () => {
            const response = await curlRequest(`${BASE_URL}/type/fire`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "fire");
            assert.strictEqual(response.body.id, 10);
        });

        it("should return status code 200 with valid type data", async () => {
            const response = await curlRequest(`${BASE_URL}/type/water`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "water");
            assert.strictEqual(response.body.id, 11);
        });

        it("should return status code 404 for a non-existent type", async function () {
            this.timeout(10000);
            const response = await curlRequest(`${BASE_URL}/type/nonexistenttype`);
            assert.strictEqual(response.statusCode, 404);
        });
    });

    describe("Test 2 - Validate type ID", () => {
        it("should return the correct ID for fire", async () => {
            const response = await curlRequest(`${BASE_URL}/type/fire`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.id, 10);
        });
    });

    describe("Test 3 - Validate damage relations", () => {
        it("should return correct damage relations for fire", async () => {
            const response = await curlRequest(`${BASE_URL}/type/fire`);
            assert.strictEqual(response.statusCode, 200);
            assert.ok(response.body.damage_relations);
            assert.ok(Array.isArray(response.body.damage_relations.double_damage_from));
            assert.ok(Array.isArray(response.body.damage_relations.double_damage_to));
            assert.ok(Array.isArray(response.body.damage_relations.half_damage_from));
            assert.ok(Array.isArray(response.body.damage_relations.half_damage_to));
        });
    });

    describe("Test 4 - Validate type generation", () => {
        it("should return the correct generation for fire", async () => {
            const response = await curlRequest(`${BASE_URL}/type/fire`);
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.generation.name, "generation-i");
        });
    });
});
