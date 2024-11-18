function authenticateAccessToken(req, res, next) {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token não fornecido' });
  }

  jwt.verify(accessToken, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Access token inválido' });
    
    req.user = decoded;
    next();
  });
}

export default authenticateAccessToken;