import { Injectable } from "@nestjs/common";

import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppService {
	constructor(private prisma: PrismaService) {}

	getHello(): string {
		return "Hello there! Make a POST requst to /auth/signup to signup.";
	}

	async getAllWarbles() {
		return await this.prisma.warble.findMany({
			orderBy: {
				createdAt: "desc",
			},
			include: {
				user: {
					select: {
						username: true,
						profileImageUrl: true,
					},
				},
			},
		});
	}
}
