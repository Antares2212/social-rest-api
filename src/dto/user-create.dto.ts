import { IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { ErrorMsg } from "src/errors/errors-list.error";
export class CreateUserDto {
  @IsNotEmpty({ message: ErrorMsg.UserNameEmpty })
  @MinLength(5, { message: ErrorMsg.UserNameMin(5) })
  readonly username: string;

  @IsNotEmpty({ message: ErrorMsg.UserEmailEmpty })
  @IsEmail({}, { message: ErrorMsg.UserEmailValid })
  readonly email: string;

  @IsNotEmpty({ message: ErrorMsg.UserPasswordEmpty })
  @MinLength(6, { message: ErrorMsg.UserPasswordMin(6) } )
  readonly password: string;
}