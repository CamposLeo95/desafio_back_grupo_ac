import { Router } from "express";
import type { AccountController } from "../../controllers/account/account.controller";

export class AccountRoutes {
	private routes: Router;

	constructor(private readonly accountController: AccountController) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.routes.post(
			"/account/credit",
			this.accountController.credit.bind(this.accountController),
		);
		this.routes.get(
			"/account/:id",
			this.accountController.findById.bind(this.accountController),
		);
		this.routes.get(
			"/accounts",
			this.accountController.findAll.bind(this.accountController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
