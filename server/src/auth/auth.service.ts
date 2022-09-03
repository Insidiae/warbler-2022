import { Injectable, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async signIn(user: User) {
		const payload = { userId: user.id };

		return {
			userId: user.id,
			username: user.username,
			profileImageUrl: user.profileImageUrl,
			access_token: this.jwtService.sign(payload),
		};
	}

	async validateUser(email: string, password: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			const isValidPassword = await bcrypt.compare(password, user.password);

			return isValidPassword ? user : null;
		}

		return null;
	}

	async signUp(rawData: Prisma.UserCreateInput) {
		try {
			const passwordHash = await bcrypt.hash(rawData.password, 10);
			const data = {
				...rawData,
				password: passwordHash,
			};

			const newUser = await this.prisma.user.create({
				data,
			});
			const payload = { userId: newUser.id };

			return {
				userId: newUser.id,
				username: newUser.username,
				profileImageUrl: newUser.profileImageUrl,
				access_token: this.jwtService.sign(payload),
			};
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new BadRequestException(
						`Sorry, that ${e.meta.target} is already taken.`,
					);
				}
			}
		}
	}
}
