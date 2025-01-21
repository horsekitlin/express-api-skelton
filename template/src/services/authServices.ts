import {Repository} from 'typeorm';
import jwt from 'jsonwebtoken';
import {saltHashPassword, User} from '../entity/User';
import {AppDataSource} from '../data-source';
import { ILoginUserResponse } from '../interfaces/userInterface';

const {
  JWT_SECRET = 'your-jwt-secret',
  JWT_EXPIRES_IN = '24h',
} = process.env;

export class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async validateUser(phone: string, password: string): Promise<ILoginUserResponse | null> {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) return null;

    const hashPassword = saltHashPassword(password);
    const isValid = hashPassword === user.password;
    if (!isValid) return null;

    return user;
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  generateToken(user: ILoginUserResponse, isApp: boolean = false): string {
    return jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        type: isApp ? 'app' : 'web',
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN},
    );
  }

  async loginApp(phone: string, password: string) {
    const user = await this.validateUser(phone, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user, true);
    return {user, token};
  }

  async loginWeb(phone: string, password: string) {
    const user = await this.validateUser(phone, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user, false);
    return {user, token};
  }
}
