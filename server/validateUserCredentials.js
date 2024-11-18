import bcrypt from 'bcrypt';

async function validateUserCredentials(req, res, next) {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username }).value();
  
  if (!user) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  next();
}

export default validateUserCredentials;