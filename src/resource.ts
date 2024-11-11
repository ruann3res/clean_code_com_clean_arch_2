import pgp from "pg-promise";

export interface AccountDAO {
  getAccountById(accountId: string): Promise<any>;
  getAccountByEmail(email: string): Promise<any>;
  saveAccount(account: any): Promise<void>;
}

export default class AccountDAODatabase implements AccountDAO {
  async getAccountById(accountId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [userAccount] = await connection.query(
      "select * from cccat17.account where account_id = $1",
      [accountId]
    );
    return userAccount;
  }
  async getAccountByEmail(email: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [userAccount] = await connection.query(
      "select * from cccat17.account where email = $1",
      [email]
    );
    await connection.$pool.end();
    return userAccount;
  }
  async saveAccount(account: any): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        account.accountId,
        account.name,
        account.email,
        account.cpf,
        account.carPlate,
        !!account.isPassenger,
        !!account.isDriver,
      ]
    );
    await connection.$pool.end();
  }
}

export class AccountDAOMemory implements AccountDAO {
  accounts: any[];

  constructor() {
    this.accounts = [];
  }

  async getAccountById(accountId: string): Promise<any> {
    return this.accounts.find(
      (account: any) => account.accountId === accountId
    );
  }
  async getAccountByEmail(email: string): Promise<any> {
    return this.accounts.find((account: any) => account.email === email);
  }
  async saveAccount(account: any): Promise<void> {
    this.accounts.push(account);
  }
}
