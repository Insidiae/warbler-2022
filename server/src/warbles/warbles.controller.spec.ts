import { Test, TestingModule } from "@nestjs/testing";
import { WarblesController } from "./warbles.controller";

describe("WarblesController", () => {
	let controller: WarblesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WarblesController],
		}).compile();

		controller = module.get<WarblesController>(WarblesController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
