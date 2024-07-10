import User from '../database/models/User';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/JWT';

export default class UserService {
  public post = async (userName: string | undefined, email: string, password: string) => {
    try {
      password = await bcrypt.hash(password, 10);
      const user = await User.create({ userName, email, password });
      return { type: 201, message: { message: user.id } };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  };

  public login = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ where: { email } });

      const isValidPassword = await bcrypt.compare(password, user!.password);

      if (!isValidPassword) {
        return { type: 401, message: { error: 'Senha incorreta' } };
      }

      const token = generateToken({ id: user!.id, email: user!.email, password: user!.password });
      return { type: 200, message: { message: token } };
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Error logging in');
    }
  }
}
