import {
	Controller,
	Post,
	UseGuards,
	Param,
	Body,
	Get,
	Delete,
} from "@nestjs/common";
import { WarblesService } from "./warbles.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { EnsureCorrectUserGuard } from "../auth/guards/ensure-correct-user.guard";

@Controller("users/:userId/warbles")
export class WarblesController {
	constructor(private warblesService: WarblesService) {}

	@Get()
	getAllWarbles(@Param("userId") userId: string) {
		return this.warblesService.getAllUserWarbles(userId);
	}

	@Post()
	@UseGuards(JwtAuthGuard, EnsureCorrectUserGuard)
	createWarble(
		@Param("userId") userId: string,
		@Body() { warble }: { warble: string },
	) {
		return this.warblesService.createWarble(userId, warble);
	}

	@Get(":warbleId")
	getWarble(@Param("warbleId") warbleId: string) {
		return this.warblesService.getWarble(warbleId);
	}

	@Delete(":warbleId")
	@UseGuards(JwtAuthGuard, EnsureCorrectUserGuard)
	deleteWarble(@Param("warbleId") warbleId: string) {
		return this.warblesService.deleteWarble(warbleId);
	}
}
