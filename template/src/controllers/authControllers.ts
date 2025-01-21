import {
  Body,
  Controller,
  Post,
  Route,
  Tags,
  SuccessResponse,
  Response
} from "tsoa";
import { AuthService } from '../services/authServices';
import { ILoginUserResponse } from "../interfaces/userInterface";
import { CustomError } from "../helpers/errorManager/customError";

// 定義請求和回應的介面
/**
 * @example
 * {
 *   "phone": "0987654321",
 *   "password": "a12345678"
 * }
 */
interface LoginRequest {
  phone: string;
  password: string;
}

// 定義請求和回應的介面
/**
 * @example
 * {
 *    "status": "success",
 *    "data": {
 *      "token": "test auth token",
 *      "user": {
 *        "id": 1,
 *        "name": "test user",
 *        "phone": "0987654321"
 *      }
 *    }
 * }
 */
interface LoginResponse {
  status: string;
  data: {
    token?: string;
    user: ILoginUserResponse;
  }
}

interface ErrorResponse {
  status: string;
  message: string;
}

@Route("auth")
@Tags("Authentication")
export class AuthController extends Controller {
  private authService: AuthService;

  constructor() {
    super();
    this.authService = new AuthService();
  }

  /**
   * App 登入
   */
  @Post("app/login")
  @Response<ErrorResponse>(401, "Unauthorized")
  @SuccessResponse("200", "Success")
  public async loginApp(
    @Body() requestBody: LoginRequest
  ): Promise<LoginResponse> {
    try {
      const result = await this.authService.loginApp(
        requestBody.phone, 
        requestBody.password
      );

      return {
        status: 'success',
        data: {
          token: result.token,
          user: {
            id: result.user.id,
            phone: result.user.phone,
            name: result.user.name
          }
        }
      };
    } catch (error) {
      throw new CustomError(error instanceof Error ? error.message : 'Login failed', 401);
    }
  }

  /**
   * Web 登入
   */
  @Post("web/login")
  @Response<ErrorResponse>(401, "Unauthorized")
  @SuccessResponse("200", "Success")
  public async loginWeb(
    @Body() requestBody: LoginRequest
  ): Promise<LoginResponse> {
    try {
      const result = await this.authService.loginWeb(
        requestBody.phone, 
        requestBody.password
      );

      // 注意：tsoa 不直接處理 cookie，需要在 express 路由層處理
      this.setHeader('Set-Cookie', `token=${result.token}; HttpOnly; Path=/; Max-Age=${24 * 60 * 60}`);

      return {
        status: 'success',
        data: {
          user: {
            id: result.user.id,
            phone: result.user.phone,
            name: result.user.name
          }
        }
      };
    } catch (error) {
      throw new CustomError(error instanceof Error ? error.message : 'Login failed', 401);
    }
  }

  /**
   * 登出
   */
  @Post("logout")
  @SuccessResponse("200", "Success")
  public async logout(): Promise<{ status: string; message: string }> {
    // 注意：tsoa 不直接處理 cookie，需要在 express 路由層處理
    this.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
    
    return {
      status: 'success',
      message: 'Logged out successfully'
    };
  }
}
