import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/createUser.request.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    createUser(@Body() dto: CreateUserDto): Observable<User | Object> {
        return this.userService.create(dto).pipe(
            catchError(err => of({ error: err.message }))
        );
    }

    @Post('login')
    login(@Body() user: User): Observable<Object> {
        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return { accessToken: jwt }
            })
        )
    }
}
