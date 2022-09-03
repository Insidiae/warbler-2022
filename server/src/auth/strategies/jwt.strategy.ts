import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	//? Based on the way JWT signing works, we're guaranteed that we're receiving
	//? a valid token that we have previously signed and issued to a valid user.
	//? https://docs.nestjs.com/security/authentication#implementing-passport-jwt
	async validate(payload: any) {
		//* This attaches a `user` object to the request (e.g. `req.user`)
		return { id: payload.userId };
	}
}
