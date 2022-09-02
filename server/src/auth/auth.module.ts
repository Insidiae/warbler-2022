import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

import { jwtConstants } from "./constants";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
})
export class AuthModule {}
