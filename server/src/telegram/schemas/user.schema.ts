import { Schema,Prop,SchemaFactory} from "@nestjs/mongoose";


@Schema()
export class User{
    @Prop()
    name:string;

    @Prop()
    chatId:string;

    @Prop()
    username:string;

    @Prop({default:false})
    isBlocked:boolean;

    @Prop()
    city:string;

}


export const UserSchema=SchemaFactory.createForClass(User)