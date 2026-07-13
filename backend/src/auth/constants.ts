interface JwtType {
  secret: string;
  expiresIn: string;
}

export const jwtConstants: JwtType = {
  secret: process.env.JWT_SECRET ?? 'default-secret-change-me',
  expiresIn: '7d',
};
