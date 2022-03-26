import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Authentication {
    public static passwordHash = (password: string): Promise<string> => {
        return bcrypt.hash(password, 10);
    }

    public static passwordCompare = async (text: string, encryptedText: string): Promise<boolean> => {
        let result = await bcrypt.compare(text, encryptedText);
        return result;
    }

    public static generateToken = (id: string, email: string, password: string): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'secretkey';
        const token: string = jwt.sign({ id, email, password }, secretKey);
        return token;
    }
}

export default Authentication;