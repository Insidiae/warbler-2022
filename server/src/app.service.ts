import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	getHello(): string {
		return "Hello there! Make a POST requst to /auth/signup to signup.";
	}
}
