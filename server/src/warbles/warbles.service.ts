import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class WarblesService {
	constructor(private prisma: PrismaService) {}

	async getAllUserWarbles(userId: string) {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
				select: {
					username: true,
					profileImageUrl: true,
					warbles: {
						orderBy: {
							createdAt: "desc",
						},
					},
				},
			});

			if (!user) {
				throw new NotFoundException("User Not Found");
			}

			return user;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2023") {
					throw new NotFoundException("User Not Found");
				}
			}

			//? just re-throw all other kinds of errors for now...
			throw e;
		}
	}

	async createWarble(userId: string, warble: string) {
		if (warble.length > 280) {
			throw new BadRequestException(
				"Warbles must be less than 280 characters long.",
			);
		}

		return await this.prisma.warble.create({
			data: {
				warble,
				user: {
					connect: {
						id: userId,
					},
				},
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

	async getWarble(warbleId: string) {
		try {
			const warble = await this.prisma.warble.findUnique({
				where: {
					id: warbleId,
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

			if (!warble) {
				throw new NotFoundException("Warble Not Found");
			}

			return warble;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2023") {
					throw new NotFoundException("Warble Not Found");
				}
			}

			throw e;
		}
	}

	async deleteWarble(warbleId: string) {
		try {
			return await this.prisma.warble.delete({
				where: {
					id: warbleId,
				},
			});
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === "P2025") {
					throw new NotFoundException("Warble Not Found");
				}
			}
		}
	}
}
