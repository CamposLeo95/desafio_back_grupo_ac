import { Router } from "express";
import type { TransactionController } from "../../controllers/transaction/transaction.controller";

export class TransactionRoutes {
	private routes: Router;
	constructor(private readonly transactionController: TransactionController) {
		this.routes = Router();
		this.setupRoutes();
	}

	private setupRoutes() {
		this.routes.post(
			"/transaction",
			this.transactionController.createTransaction.bind(
				this.transactionController,
			),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
