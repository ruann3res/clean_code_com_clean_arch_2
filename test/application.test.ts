import { AccountService } from "../src/application";
import { AccountDAOMemory } from "../src/resource";

let accountService: AccountService;

beforeEach(() => {
  const accountDAO = new AccountDAOMemory();
  accountService = new AccountService(accountDAO);
});

test("Não deve criar uma conta para o passageiro com nome invalido", async function () {
  const input = {
    name: "",
    email: `Ruanteste${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };

  await expect(() => accountService.signup(input)).rejects.toThrow(
    new Error("Invalid name")
  );
});

test("Não deve criar uma conta para o passageiro com email invalido", async function () {
  const input = {
    name: "Ruan Neres",
    email: `Ruanteste${Math.random()}`,
    cpf: "97456321558",
    isPassenger: true,
  };
  await expect(() => accountService.signup(input)).rejects.toThrow(
    new Error("Invalid e-mail")
  );
});

test("Não deve criar uma conta para o passageiro com email duplicado", async function () {
  const input = {
    name: "Ruan Neres",
    email: `Ruanteste${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };

  await accountService.signup(input);
  await expect(() => accountService.signup(input)).rejects.toThrow(
    new Error("Account already exists")
  );
});

test("Não deve criar uma conta para o passageiro com cpf invalido", async function () {
  const input = {
    name: "Ruan Neres",
    email: `Ruanteste${Math.random()}@gmail.com`,
    cpf: "1234567899",
    isPassenger: true,
  };
  await expect(() => accountService.signup(input)).rejects.toThrow(
    new Error("CPF must be valid")
  );
});

test("Deve criar uma conta para o motorista", async function () {
  const input = {
    name: "John Doe",
    email: `Ruanteste${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isDriver: true,
    carPlate: "AAA9999",
  };
  const outputSingup = await accountService.signup(input);
  expect(outputSingup.accountId).toBeDefined();
  const outputGetUserById = await accountService.getUserById(
    outputSingup.accountId
  );
  expect(outputGetUserById.name).toBe(input.name);
  expect(outputGetUserById.email).toBe(input.email);
  expect(outputGetUserById.cpf).toBe(input.cpf);
  expect(outputGetUserById.carPlate).toBe(input.carPlate);
});

test("Não deve criar uma conta para o motorista com a placa invalida", async function () {
  const input = {
    name: "John Doe",
    email: `Ruanteste${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isDriver: true,
    carPlate: "AAA999",
  };
  await expect(() => accountService.signup(input)).rejects.toThrow(
    new Error("The car plate is invalid")
  );
});

test("Deve criar uma conta para o passageiro", async function () {
  const inputSignup = {
    name: "John Doe",
    email: `Ruanteste${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
  };

  const outputSingup = await accountService.signup(inputSignup);
  expect(outputSingup.accountId).toBeDefined();
  const outputGetUserById = await accountService.getUserById(
    outputSingup.accountId
  );
  expect(outputGetUserById.name).toBe(inputSignup.name);
  expect(outputGetUserById.email).toBe(inputSignup.email);
  expect(outputGetUserById.cpf).toBe(inputSignup.cpf);
});
