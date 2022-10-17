import {Injectable, NotFoundException, NotImplementedException} from '@nestjs/common';
import {PrismaClient, User} from "@prisma/client";
import {UserDto} from "../user/dto/user.dto";
import {CityDto} from "./dto/city.dto";

const prisma = new PrismaClient();

@Injectable()
export class CitiesService {

    async getCity(id: number): Promise<User> {
        const city = await prisma.user.findUnique({
            where: {
                id: +id,
            },
        });
        if (city) {
            return city;
        }
        throw new NotFoundException("User doesn't exist!");
    }

    async createCity(CreateCityDto: CityDto): Promise<User> {

        const { name, overcat } = CreateCityDto;
        const city = await prisma.user.create({
            data: {
                email: overcat,
                name: name,
            },
        });
        return city;
    }

    async updateCity(id: number, CreateCityDto: CityDto): Promise<User> {
        const { name, overcat } = CreateCityDto;
        const city = await prisma.user.update({
            where: {
                id: +id,
            },
            data: {
                email: overcat,
                name: name,
            },
        });
        return city;
    }

    async deleteCity(id: number): Promise<void> {
        const city = await this.getCity(id);
        if (city) {
            await prisma.user.delete({ where: { id: +id } });
        }
    }

    async findCity(id: number): Promise<User> {
        const city = await this.getCity(id);
        if (city) {
            return city;
        }
    }
}


