import { Request, Response } from 'express';

function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an email and password',
    });
  }

  // Check if the credentials ar correct

  //...

  // Assume that the credentials are correct.
  req.session.clientId = 'asd123';
  req.session.myNum = 1;

  res.status(200).json({ message: 'Logged in successfully' });
}

export default { login };
