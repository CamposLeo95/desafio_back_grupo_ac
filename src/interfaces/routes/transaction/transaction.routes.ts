import { Router } from "express";
import { verifyToken } from "../../../middlewares/verify-token";
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
			verifyToken,
			this.transactionController.createTransaction.bind(
				this.transactionController,
			),
		);

		this.routes.post(
			"/transaction/reversal/:id",
			verifyToken,
			this.transactionController.reversalTransaction.bind(
				this.transactionController,
			),
		);

		this.routes.get(
			"/transaction/:account_number",
			verifyToken,
			this.transactionController.findAllSendByAccount.bind(
				this.transactionController,
			),
		);
	}

	public getRoutes() {
		return this.routes;
	}
}
