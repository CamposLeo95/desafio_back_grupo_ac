import type { Request, Response } from "express";
import type { FindAllRequestReversalUseCase } from "../../../app/use-cases/request-reversal/find-all.usecase";
import type { PendingRequestReversalUseCase } from "../../../app/use-cases/request-reversal/pending-request-reversal.usecase";
import type { RejectRequestReversalUseCase } from "../../../app/use-cases/request-reversal/reject-request-reversal.usecase";
import type { RequestReversalUseCase } from "../../../app/use-cases/request-reversal/request-reversal.usecase";
import { AppError } from "../../../shared/exceptions/app-error";

export class RequestReversalController {
	constructor(
		private readonly requestReversalUseCase: RequestReversalUseCase,
		private readonly findAllRequestReversalUseCase: FindAllRequestReversalUseCase,
		private readonly pendingReversalUseCasePending: PendingRequestReversalUseCase,
		private readonly rejectRequestReversalUseCase: RejectRequestReversalUseCase,
	) {}

	async findAll(req: Request, res: Response) {
		try {
			const token = req.headers.authorization?.split(" ")[1] || "";
			const requestReversals =
				await this.findAllRequestReversalUseCase.execute(token);
			res.status(200).json(requestReversals);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}

	async requestReversal(req: Request, res: Response) {
		const { idTransaction } = req.params;
		const { description } = req.body;
		const token = req.headers.authorization?.split(" ")[1] || "";

		try {
			const requestReversal = await this.requestReversalUseCase.execute(
				idTransaction,
				description,
			);
			res.status(201).json(requestReversal);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}

	async pendingRequestReversal(req: Request, res: Response) {
		const { idRequestReversal } = req.params;
		const token = req.headers.authorization?.split(" ")[1] || "";

		try {
			const requestReversal = await this.pendingReversalUseCasePending.execute(
				idRequestReversal,
				token,
			);
			res.status(200).json(requestReversal);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}

	async rejectRequestReversal(req: Request, res: Response) {
		const { idRequestReversal } = req.params;
		const token = req.headers.authorization?.split(" ")[1] || "";

		try {
			const requestReversal = await this.rejectRequestReversalUseCase.execute(
				idRequestReversal,
				token,
			);
			res.status(200).json(requestReversal);
		} catch (error) {
			if (error instanceof AppError) {
				res.status(error.statusCode).json({ error: error.message });
			}
			res.status(500).json({ error: "Erro interno no servidor!" });
		}
	}
}
