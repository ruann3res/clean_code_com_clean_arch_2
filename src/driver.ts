import express, { Request, Response } from "express";
import AccountService from "./application";

export class API {
  app: any;
  accountService: AccountService;
  constructor(accountService: AccountService) {
    this.app = express();
    this.app.use(express.json());
    this.accountService = accountService;
  }
  build() {
    this.app.post(
      "/signup",
      async (request: Request, response: Response): Promise<any> => {
        const input = request.body;
        try {
          const signupResponse = await this.accountService.signup(input);
          response.send(signupResponse);
        } catch (e: any) {
          response.status(422).json({
            message: e.message,
          });
        }
      }
    );

    this.app.get(
      "/signup/:id",
      async (request: Request, response: Response): Promise<any> => {
        const id = request.params.id;
        const account = await this.accountService.getUserById(id);
        response.send(account);
      }
    );
  }
  start() {
    this.app.listen(3000);
  }
}
