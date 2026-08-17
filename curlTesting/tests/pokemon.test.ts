import { curlRequest } from "../utils/curl";

declare const process: {
    exitCode?: number;
};

const BASE_URL = "https://pokeapi.co/api/v2";

async function testGetPokemon(): Promise<void> {

    console.log("\nTest: GET Pokemon");

    const response = await curlRequest(
        `${BASE_URL}/pokemon/pikachu`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (response.body.name !== "pikachu") {
        throw new Error(
            `Expected Pokemon "pikachu" but received "${response.body.name}"`
        );
    }

    console.log("✅ Status code is 200");
    console.log("✅ Pokemon name is correct");
}

async function testPokemonId(): Promise<void> {

    console.log("\nTest: Validate Pokemon ID");

    const response = await curlRequest(
        `${BASE_URL}/pokemon/pikachu`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (response.body.id !== 25) {
        throw new Error(
            `Expected ID 25 but received ${response.body.id}`
        );
    }

    console.log("✅ Pokemon ID is correct");
}

async function testPokemonTypes(): Promise<void> {

    console.log("\nTest: Validate Pokemon types");

    const response = await curlRequest(
        `${BASE_URL}/pokemon/pikachu`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (!Array.isArray(response.body.types)) {
        throw new Error(
            "Pokemon types should be an array"
        );
    }

    if (response.body.types.length === 0) {
        throw new Error(
            "Pokemon should have at least one type"
        );
    }

    console.log("✅ Types is an array");
    console.log("✅ Pokemon has at least one type");
}

async function testPokemonAbilities(): Promise<void> {

    console.log("\nTest: Validate Pokemon abilities");

    const response = await curlRequest(
        `${BASE_URL}/pokemon/pikachu`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (!Array.isArray(response.body.abilities)) {
        throw new Error(
            "Pokemon abilities should be an array"
        );
    }

    if (response.body.abilities.length === 0) {
        throw new Error(
            "Pokemon should have at least one ability"
        );
    }

    console.log("✅ Abilities is an array");
    console.log("✅ Pokemon has at least one ability");
}

async function testPokemonSprites(): Promise<void> {

    console.log("\nTest: Validate Pokemon sprites");

    const response = await curlRequest(
        `${BASE_URL}/pokemon/pikachu`
    );

    if (response.statusCode !== 200) {
        throw new Error(
            `Expected status 200 but received ${response.statusCode}`
        );
    }

    if (!response.body.sprites) {
        throw new Error(
            "Pokemon sprites should exist"
        );
    }

    if (!response.body.sprites.front_default) {
        throw new Error(
            "Pokemon should have a front_default sprite"
        );
    }

    console.log("✅ Sprites object exists");
    console.log("✅ front_default sprite exists");
}

async function testPokemonNotFound(): Promise<void> {

    console.log("\nTest: Pokemon does not exist");

    const response = await curlRequest(
        `${BASE_URL}/pokemon/pokemon-does-not-exist`
    );

    if (response.statusCode !== 404) {
        throw new Error(
            `Expected status 404 but received ${response.statusCode}`
        );
    }

    console.log("✅ Non-existent Pokemon returns 404");
}

async function runTests(): Promise<void> {

    console.log("POKEMON TEST SUITE");

    try {
        await testGetPokemon();
        await testPokemonId();
        await testPokemonTypes();
        await testPokemonAbilities();
        await testPokemonSprites();
        await testPokemonNotFound();

        console.log("\n🎉 All Pokemon tests passed!");

    } catch (error) {

        console.error(
            `\n❌ Test failed: ${
                error instanceof Error
                    ? error.message
                    : error
            }`
        );

        process.exitCode = 1;
    }
}

runTests();