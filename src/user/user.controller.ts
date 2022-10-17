import { Get, Post, Delete, Param, Controller, Body } from "@nestjs/common";
import { Request } from 'express';
import { User } from '@prisma/client';
import {UserService} from './user.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags('User')
@ApiResponse({
    status: 501,
    description: 'The method is not implemented',
})

@Controller('user')
export class UserController {
    constructor(private  readonly userService: UserService) {}
    @ApiOperation({
        summary: 'User methods',
    })
    @Get(':user')
    async getUser(
        @Param('user')userID: number,
    ): Promise<User>{
        return await this.userService.findUser(userID);
    }


    @Delete(':user/delete')
    async deleteUser(
        @Param('user')userID: number
    ): Promise<void>{
        return await this.userService.deleteUser(userID);
    }
}
