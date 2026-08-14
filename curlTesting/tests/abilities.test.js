const { curlRequest } = require("../utils/curl");

const BASE_URL = "https://pokeapi.co/api/v2";

// ========================================
// TEST 1 - Get ability by name
// ========================================

async function testGetAbility() {

    console.log("\nTest: GET Ability");

    const response = await curlRequest(
        `${BASE_URL}/ability/stench`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (response.body.name !== "stench") {
        throw new Error(
            `Expected ability "stench" but received "${response.body.name}"`
        );
    }

    console.log("✅ Status code is 200");
    console.log("✅ Ability name is correct");
}


// ========================================
// TEST 2 - Validate ability ID
// ========================================

async function testAbilityId() {

    console.log("\nTest: Validate Ability ID");

    const response = await curlRequest(
        `${BASE_URL}/ability/stench`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (response.body.id !== 1) {
        throw new Error(
            `Expected ID 1 but received ${response.body.id}`
        );
    }

    console.log("✅ Ability ID is correct");
}


// ========================================
// TEST 3 - Validate effect entries
// ========================================

async function testAbilityEffectEntries() {

    console.log("\nTest: Validate effect entries");

    const response = await curlRequest(
        `${BASE_URL}/ability/stench`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (!Array.isArray(response.body.effect_entries)) {
        throw new Error(
            "effect_entries should be an array"
        );
    }

    if (response.body.effect_entries.length === 0) {
        throw new Error(
            "effect_entries should not be empty"
        );
    }

    console.log("✅ effect_entries is an array");
    console.log("✅ effect_entries contains data");
}


// ========================================
// TEST 4 - Ability does not exist
// ========================================

async function testAbilityNotFound() {

    console.log("\nTest: Ability does not exist");

    const response = await curlRequest(
        `${BASE_URL}/ability/ability-does-not-exist`
    );

    if (response.statusCode !== 404) {
        throw new Error(
            `Expected status 404 but received ${response.statusCode}`
        );
    }

    console.log("✅ Non-existent ability returns 404");
}


// ========================================
// RUN TESTS
// ========================================

async function runTests() {

    console.log("=================================");
    console.log("       ABILITIES TEST SUITE");
    console.log("=================================");

    try {

        await testGetAbility();

        await testAbilityId();

        await testAbilityEffectEntries();

        await testAbilityNotFound();

        console.log("\n🎉 All ability tests passed!");

    } catch (error) {

        console.error(`\n❌ Test failed: ${error.message}`);

        process.exitCode = 1;
    }
}

runTests();