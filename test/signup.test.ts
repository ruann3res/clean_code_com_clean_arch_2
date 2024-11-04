import { getUserById, signup } from "../src/signup";

test("Deve criar uma conta para o passageiro", async function(){
    const input = {
        name: "John Doe",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isPassenger:true
    }
    const outputSingup = await signup(input)
    expect(outputSingup.accountId).toBeDefined();
    const outputGetUserById = await getUserById(outputSingup.accountId)
    expect(outputGetUserById.name).toBe(input.name)
    expect(outputGetUserById.email).toBe(input.email)
    expect(outputGetUserById.cpf).toBe(input.cpf)
})

test("Não deve criar uma conta para o passageiro com nome invalido", async function(){
    const input = {
        name: "",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isPassenger:true
    }
    const output = await signup(input)
    expect(output).toBe(-3)
})

test("Não deve criar uma conta para o passageiro com email invalido", async function(){
    const input = {
        name: "Ruan Neres",
        email: `Ruanteste${Math.random()}`,
        cpf: "97456321558",
        isPassenger:true
    }
    const output = await signup(input)
    expect(output).toBe(-2)
})

test("Não deve criar uma conta para o passageiro com email duplicado", async function(){
    const input = {
        name: "Ruan Neres",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isPassenger:true
    }

    await signup(input)
    const output = await signup(input)
    expect(output).toBe(-4)
})

test("Não deve criar uma conta para o passageiro com cpf invalido", async function(){
    const input = {
        name: "Ruan Neres",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "1234567899",
        isPassenger:true
    }
    const output = await signup(input)
    expect(output).toBe(-1)
})

test("Deve criar uma conta para o motorista", async function(){
    const input = {
        name: "John Doe",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isDriver: true,
        carPlate:"AAA9999"
    }
    const outputSingup = await signup(input)
    expect(outputSingup.accountId).toBeDefined();
    const outputGetUserById = await getUserById(outputSingup.accountId)
    expect(outputGetUserById.name).toBe(input.name)
    expect(outputGetUserById.email).toBe(input.email)
    expect(outputGetUserById.cpf).toBe(input.cpf)
    expect(outputGetUserById.car_plate).toBe(input.carPlate)
})

test("Não deve criar uma conta para o motorista com a placa invalida", async function(){
    const input = {
        name: "John Doe",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isDriver: true,
        carPlate:"AAA999"
    }
    const outputSingup = await signup(input)
    expect(outputSingup).toBe(-5)
})