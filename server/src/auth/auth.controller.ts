import { Controller, Post, Request, Body, UseGuards } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signin")
	@UseGuards(LocalAuthGuard)
	signIn(@Request() req) {
		return this.authService.signIn(req.user);
	}

	@Post("signup")
	async signUp(@Body() user: Prisma.UserCreateInput) {
		return this.authService.signUp(user);
	}
}
