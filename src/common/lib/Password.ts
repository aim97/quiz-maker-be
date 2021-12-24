import { scrypt, randomBytes } from 'crypto'; 
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string): Promise<string> {
      const salt = randomBytes(8).toString('hex');
      const buf = (await scryptAsync(password, salt, 64)) as Buffer;
      return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(password: string, hash: string): Promise<boolean> {
      const [hashedPassword, salt] = hash.split('.');
      const buf = (await scryptAsync(password, salt, 64)) as Buffer;
      return buf.toString('hex') === hashedPassword;
    }
}