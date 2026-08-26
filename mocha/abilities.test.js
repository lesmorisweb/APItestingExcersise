

const { curlRequest } = require("../curlTesting/utils/curl");
const assert = require("assert");

const BASE_URL = "https://pokeapi.co/api/v2";

describe(" Validate abilities", () => {

    describe("Test 1 - Validate ability name", () => {
        it("Should the ability name be correct", async () => {
            const response = await curlRequest(
                `${BASE_URL}/ability/stench`
            );
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.name, "stench");
        });
    });

    describe("Test 2 - Validate ability ID", () => {
        it("Should the ability ID be correct", async () => {
            const response = await curlRequest(
                `${BASE_URL}/ability/2`
            );
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.id, 2);
            assert.strictEqual(response.body.name, "drizzle");
        });
    });

    describe("Test 3 - Validate ability effect entries", () => {
        it("Should the ability effect entries be correct", async () => {
            const response = await curlRequest(
                `${BASE_URL}/ability/stench`
            );
            assert.strictEqual(response.statusCode, 200);
            assert.ok(Array.isArray(response.body.effect_entries));
            assert.ok(response.body.effect_entries.length > 0);
        });
    })

    describe("Test 4 - Validate ability generation", () => {
        it("Should the ability generation be correct", async () => {
            const response = await curlRequest(
                `${BASE_URL}/ability/stench`
            );
            assert.strictEqual(response.statusCode, 200);
            assert.strictEqual(response.body.generation.name, "generation-iii");
        });
    });
});