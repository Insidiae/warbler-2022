import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { WarblesController } from "./warbles/warbles.controller";
import { WarblesService } from "./warbles/warbles.service";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from "./auth/auth.module";

@Module({
	imports: [AuthModule],
	controllers: [AppController, WarblesController],
	providers: [AppService, WarblesService, PrismaService],
})
export class AppModule {}
