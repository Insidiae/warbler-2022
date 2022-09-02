import { Controller, Post } from "@nestjs/common";
import { WarblesService } from "./warbles.service";

@Controller("users/:id/warbles")
export class WarblesController {
	constructor(private warblesService: WarblesService) {}

	@Post()
	createMessage(): string {
		return this.warblesService.createMessage();
	}
}
