import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../model/user.entity';
import { Repository } from 'typeorm';
import { User } from '../model/user.interface';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { CreateUserDto } from '../dto/createUser.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  login(user: User): Observable<string> {
    return this.validateUser(user.username, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJwt(user)
            .pipe(map((jwt: string) => jwt));
        } else {
          return 'Wrong credentials';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email: email },
        select: [
          'id',
          'username',
          'email',
          'fullname',
          'password',
          'unit',
          'position',
          'department',
          'division',
          'status',
        ],
      }),
    ).pipe(
      switchMap((user: User) =>
        this.authService.comparePassword(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.authService.hashPassword(dto.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.email = dto.email;
        newUser.username = dto.username;
        newUser.fullname = dto.fullname;
        newUser.unit = dto.unit;
        newUser.position = dto.position;
        newUser.department = dto.department;
        newUser.division = dto.division;
        newUser.avatarImage = dto.avatarImage;
        newUser.status = 'active';
        newUser.password = passwordHash;

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user;
            return result;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }
}
