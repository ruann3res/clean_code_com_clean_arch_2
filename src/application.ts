import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCPF";

import AccountDAO from "./resource";

export class AccountService {
  accountDAO: AccountDAO;

  constructor(accountDAO: AccountDAO) {
    this.accountDAO = accountDAO;
  }

  async signup(input: any): Promise<any> {
    const account = { accountId: crypto.randomUUID(), ...input };
    const accountAlreadyExists = await this.accountDAO.getAccountByEmail(
      input.email
    );
    if (accountAlreadyExists) throw new Error("Account already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid e-mail");
    if (!validateCpf(input.cpf)) throw new Error("CPF must be valid");
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/))
      throw new Error("The car plate is invalid");
    await this.accountDAO.saveAccount(account);
    return { accountId: account.accountId };
  }

  async getUserById(accountId: any) {
    const userAccount = await this.accountDAO.getAccountById(accountId);
    return userAccount;
  }
}
