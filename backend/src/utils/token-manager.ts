//manages token for authentication
import jwt from "jsonwebtoken"

export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email }; // payload = set of fields included in generated token for specific user; not encrypted
    const userToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return userToken;
};
