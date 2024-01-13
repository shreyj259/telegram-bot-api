import { BadRequestException, Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
  private jwtService: JwtService
    ) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
  
    const hashedPassword = await bcrypt.hash(password, 12);

    return this.appService.create({
      name,
      email,
      password: hashedPassword,
    });
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {

    const admin = await this.appService.findOne({ email });

    if (!admin) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(password, admin.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: admin.id });

    response.cookie('jwt', jwt);

    return {
      message: 'Logged in successfully',
    };
  }

  @Post('logout')
    async logout(@Res({ passthrough: true }) response:Response ){
      response.clearCookie('jwt');

      return{
        message:"Logged out successfully"
      }
    }



  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
