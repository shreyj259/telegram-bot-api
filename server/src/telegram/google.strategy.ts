import { Injectable } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import {Strategy} from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_SECRET,
            callbackURL:"https://pro-quill-production.up.railway.app",
            scope:['email','profile']
        })
    }

    async validate(acessToken,refreshToken,profile,done){
        const {name,emails}=profile
        const user={
            email:emails[0].value,
            firstName:name.givenName,
            lastName:name.familyName,
            acessToken
        }
        done(null,user)
    }

}