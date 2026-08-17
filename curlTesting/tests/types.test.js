const { curlRequest } = require("../utils/curl");

const BASE_URL = "https://pokeapi.co/api/v2";

async function testGetType() {

    console.log("\nTest: GET Type");

    const response = await curlRequest(
        `${BASE_URL}/type/fire`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (response.body.name !== "fire") {
        throw new Error(
            `Expected type "fire" but received "${response.body.name}"`
        );
    }

    console.log("✅ Status code is 200");
    console.log("✅ Type name is correct");
}

async function testTypeId() {

    console.log("\nTest: Validate Type ID");

    const response = await curlRequest(
        `${BASE_URL}/type/fire`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (response.body.id !== 10) {
        throw new Error(
            `Expected ID 10 but received ${response.body.id}`
        );
    }

    console.log("✅ Type ID is correct");
}

async function testDamageRelations() {

    console.log("\nTest: Validate damage relations");

    const response = await curlRequest(
        `${BASE_URL}/type/fire`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (!response.body.damage_relations) {
        throw new Error(
            "damage_relations should exist"
        );
    }

    console.log("✅ damage_relations exists");
}

async function testDamageRelationStructure() {

    console.log("\nTest: Validate damage relation structure");

    const response = await curlRequest(
        `${BASE_URL}/type/fire`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    const damageRelations = response.body.damage_relations;

    if (!Array.isArray(damageRelations.double_damage_from)) {
        throw new Error(
            "double_damage_from should be an array"
        );
    }

    if (!Array.isArray(damageRelations.double_damage_to)) {
        throw new Error(
            "double_damage_to should be an array"
        );
    }

    if (!Array.isArray(damageRelations.half_damage_from)) {
        throw new Error(
            "half_damage_from should be an array"
        );
    }

    if (!Array.isArray(damageRelations.half_damage_to)) {
        throw new Error(
            "half_damage_to should be an array"
        );
    }

    console.log("✅ double_damage_from is an array");
    console.log("✅ double_damage_to is an array");
    console.log("✅ half_damage_from is an array");
    console.log("✅ half_damage_to is an array");
}

async function testTypeNotFound() {

    console.log("\nTest: Type does not exist");

    const response = await curlRequest(
        `${BASE_URL}/type/type-does-not-exist`
    );

    if (response.statusCode !== 404) {
        throw new Error(
            `Expected status 404 but received ${response.statusCode}`
        );
    }

    console.log("✅ Non-existent type returns 404");
}

async function runTests() {

    console.log("TYPES TEST SUITE");
    
    try {

        await testGetType();
        await testTypeId();
        await testDamageRelations();
        await testDamageRelationStructure();
        await testTypeNotFound();

        console.log("\n🎉 All type tests passed!");

    } catch (error) {

        console.error(`\n❌ Test failed: ${error.message}`);

        process.exitCode = 1;
    }
}

runTests();