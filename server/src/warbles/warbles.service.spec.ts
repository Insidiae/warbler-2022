import { Test, TestingModule } from "@nestjs/testing";
import { WarblesService } from "./warbles.service";

describe("WarblesService", () => {
	let service: WarblesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [WarblesService],
		}).compile();

		service = module.get<WarblesService>(WarblesService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
