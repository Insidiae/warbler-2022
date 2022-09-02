import { Injectable } from "@nestjs/common";

@Injectable()
export class WarblesService {
	createMessage(): string {
		return "Create a new message here!";
	}
}
