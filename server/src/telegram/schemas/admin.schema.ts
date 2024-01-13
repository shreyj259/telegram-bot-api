import { Schema,Prop,SchemaFactory} from "@nestjs/mongoose";


@Schema()
export class Admin{
    @Prop()
    name:string;

    @Prop({unique:true,required:true})
    email:string;

    @Prop()
    password:string;

}


export const AdminSchema=SchemaFactory.createForClass(Admin)