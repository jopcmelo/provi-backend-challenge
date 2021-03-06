import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(401).json({ error: 'User already exists' });
    }

    const { id } = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    return res.json({ id, email });
  }
}

export default new UserController();
