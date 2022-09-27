import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }

    const hashedPass = this.userService.generateHashedPass(password, user.salt);

    if (user.hashed_pass !== hashedPass) {
      throw new UnauthorizedException();
    }

    const result = {
      id: user.id,
      email: user.email,
      role: user.role,
      cudos_address: user.cudos_address,
      payout_address: user.payout_address,
      farms: user.farms,
    };

    return result;
  }

  async login(user: any) {
    const access_token = this.jwtService.sign({ ...user });
    return {
      access_token,
    };
  }
}
