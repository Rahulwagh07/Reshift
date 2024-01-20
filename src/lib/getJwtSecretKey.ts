export function getJwtSecretKey() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
  }