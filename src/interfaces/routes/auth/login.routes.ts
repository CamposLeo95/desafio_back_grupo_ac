import { Router } from "express";
import type { LoginController } from "../../controllers/auth/login.controller";

export class LoginRoutes {
	private routes: Router;
	constructor(private readonly loginController: LoginController) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes(): void {
		this.routes.post(
			"/login",
			this.loginController.login.bind(this.loginController),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
