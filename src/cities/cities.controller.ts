import {Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "@prisma/client";
import {CitiesService} from "./cities.service";
import internal from "stream";

@ApiTags('City')
@ApiResponse({
    status: 501,
    description: 'The method is not implemented',
})

@Controller('cities')
export class CitiesController {
    constructor(private  readonly citiesService: CitiesService) {}
    @ApiOperation({
        summary: 'Cities methods',
    })
    @Get(':cities')
    async getCity(
        @Param('city')cityID: number,
    ): Promise<User>{
        return await this.citiesService.findCity(cityID);
    }



    @Delete(':city/delete')
    async deleteCity(
        @Param('user')cityiD: number,
    ): Promise<void>{
        return await this.citiesService.deleteCity(cityiD);
    }}
