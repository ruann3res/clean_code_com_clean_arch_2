import express, { Request, Response } from "express";
import { AccountService } from "./application";
import AccountDAODatabase from "./resource";
const app = express();

app.use(express.json());

const AccountDAO = new AccountDAODatabase();
const accountService = new AccountService(AccountDAO);

app.post(
  "/signup",
  async (request: Request, response: Response): Promise<any> => {
    const input = request.body;
    try {
      const signupResponse = await accountService.signup(input);
      response.send(signupResponse);
    } catch (e: any) {
      response.status(422).json({
        message: e.message,
      });
    }
  }
);

app.get(
  "/signup/:id",
  async (request: Request, response: Response): Promise<any> => {
    const id = request.params.id;
    const account = await accountService.getUserById(id);
    response.send(account);
  }
);

app.listen(3000);
