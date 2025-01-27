import {Entity, Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import * as crypto from 'crypto';
import nacosManager from '../helpers/nacosManager';

export const sha512 = function (password: string, salt: string) {
    const hash = crypto.createHmac(
      'sha512',
      salt,
    ); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
      salt: salt,
      passwordHash: value.toString(),
    };
  };

export const saltHashPassword = (userpassword: string) => {
  const config = nacosManager.getConfig();
    const passwordData = sha512(userpassword, config.SALT_SECRET as string);
    return passwordData.passwordHash;
  };

  
@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  password: string;

  // 密碼加密鉤子
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = saltHashPassword(this.password);
    }
  }
}
