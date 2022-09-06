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

	async getAllWarbles(userId: string) {
		return await this.prisma.warble.findMany({
			where: {
				userId,
			},
			include: {
				user: {
					select: {
						username: true,
						profileImageUrl: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
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
