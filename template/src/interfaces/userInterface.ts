/**
 * @example
 * {
 *   "phone": "0987654321",
 *   "password": "a12345678"
 * }
 */
export interface ICreateUserRequest {
  phone: string;
  password: string;
}

/**
 * @example
 * {
 *   "id": 1,
 *   "phone": "0987654321",
 *   "password": "a12345678"
 * }
 */
export interface ILoginUserResponse {
  id: number;
  name: string;
  phone: string;
}