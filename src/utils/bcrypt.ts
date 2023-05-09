import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string): Promise<string> {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hash(rawPassword, SALT);
}

export function comparePasswords(rawPassword: string, hashedPassword: string) {
  return bcrypt.compareSync(rawPassword, hashedPassword);
}
