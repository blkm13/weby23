import {Injectable, NotImplementedException, NotFoundException} from '@nestjs/common';
import {User, PrismaClient} from "@prisma/client";
import {UserDto} from "./dto/user.dto";

const prisma = new PrismaClient();


@Injectable()
export class UserService {

    async getUser(id: number): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id: +id,
            },
        });
        if (user) {
            return user;
        }
        throw new NotFoundException("User doesn't exist!");
    }

    async createUser(CreateUserDto: UserDto): Promise<User> {

        const { email, name } = CreateUserDto;
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
            },
        });
        return user;
    }

    async updateUser(id: number, CreateUserDto: UserDto): Promise<User> {
        const { email, name } = CreateUserDto;
        const user = await prisma.user.update({
            where: {
                id: +id,
            },
            data: {
                email: email,
                name: name,
            },
        });
        return user;
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.getUser(id);
        if (user) {
            await prisma.user.delete({ where: { id: +id } });
        }
    }

    async findUser(id: number): Promise<User> {
        const user = await this.getUser(id);
        if (user) {
            return user;
        }
    }
}
