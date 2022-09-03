import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class EnsureCorrectUserGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();

		//? `req.user` should be provided after passing through the `JwtAuthGuard`
		const userTokenId = req.user.id;
		const userId = req.params.userId;

		if (userTokenId !== userId) {
			throw new UnauthorizedException();
		}

		return true;
	}
}
