const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const routes = require('./routes.json');

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '192.168.1.8';
const PORT = process.env.PORT || 3000;

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

dotenv.config();

server.use(cookieParser());
server.use(middlewares);
server.use(jsonServer.bodyParser);

function generateAccessToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
  );
}

async function validateUserCredentials(req, res, next) {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username e senha são obrigatórios' });
  }

  const user = router.db.get('users').find({ username }).value();
  
  if (!user) {
    return res.status(403).json({ message: 'Usuário não encontrado' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return res.status(403).json({ message: 'Não autorizado' });
  }

  next();
}

function authenticateAccessToken(req, res, next) {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token não fornecido' });
  }

  jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Access token inválido' });

    req.user = decoded;
    next();
  });
}

// registers new user and stores in /user with hashed password
server.post('/auth/register', (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get('users').find({ username }).value();

  if (user) {
    return res.status(409).json({ message: 'Nome de usuário já existe' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword };

  router.db.get('users').push(newUser).write();
  return res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// verifies user credentials on login and generates tokens
server.post('/auth/login', validateUserCredentials, async (req, res) => {
  const username = req.body.username;
  const userId = router.db.get('users').find({ username }).value().id;

  const refreshToken = generateRefreshToken({ id: userId, username: username }); 
  const accessToken = generateAccessToken({ id: userId, username: username });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.json({ token: accessToken });
});

server.post('/auth/refresh-token', (req, res) => {
  const refreshToken = req.cookies.refreshToken; 
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token não fornecido' });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Refresh token inválido' });
    const newAccessToken = generateAccessToken(user);
    return res.json({ token: newAccessToken });
  });
});

server.post('/auth/logout', (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Fez logout com sucesso' });
});

server.delete('/auth/delete-account', authenticateAccessToken, (req, res) => {
  const userId = req.user.id;
  router.db.get('users').remove({ id: userId }).write();
  
  router.db.get('personal').remove({ userId }).write();
  router.db.get('address').remove({ userId }).write();
  router.db.get('card').remove({ userId }).write();
  router.db.get('carts').remove({ userId }).write();
  router.db.get('orders').remove({ userId }).write();
  
  res.clearCookie('refreshToken');
  res.json({ message: userId });
});

server.post('/data/*', authenticateAccessToken, (req, res, next) => {
  req.body.userId = req.user.id;
  next();
});

server.put('/data/*', authenticateAccessToken, (req, res, next) => {
  req.body.userId = req.user.id;
  next();
});

server.delete('/data/*', authenticateAccessToken, (req, res, next) => {
  next();
});

server.get('/data/*', authenticateAccessToken, (req, res) => {
  const userId = req.user.id;
  const subpath = req.path.split('/')[2];
  const dataSet = router.db.get(subpath).value();

  if (!dataSet) {
    return res.status(404).json({ message: 'Recurso não encontrado' });
  }

  const userData = dataSet.filter(item => item.userId === userId);
  res.json(userData);
});

server.get('/orders/*', authenticateAccessToken, (req, res) => {
  const userId = req.user.id;
  const orderId = req.path.split('/')[2];
  const order = router.db.get('orders').find(order => order.id == orderId).value();

  if (!order) {
    return res.status(404).json({ message: 'Pedido não encontrado' });
  } else if (order.userId != userId) {
    return res.status(403).json({ message: 'O usuário não tem permissão para acessar o pedido solicitado' })
  }

  res.json(order);
});

server.get('/username', authenticateAccessToken, (req, res) => {
  const { username } = req.user;
  res.json(username);
});

server.use(jsonServer.rewriter(routes));

server.use(router);

server.listen(PORT, HOST, () => {
  console.log(`      
    █     █░▓█████  ██▓     ▄████▄   ▒█████   ███▄ ▄███▓▓█████ 
    ▓█░ █ ░█░▓█   ▀ ▓██▒    ▒██▀ ▀█  ▒██▒  ██▒▓██▒▀█▀ ██▒▓█   ▀ 
    ▒█░ █ ░█ ▒███   ▒██░    ▒▓█    ▄ ▒██░  ██▒▓██    ▓██░▒███   
    ░█░ █ ░█ ▒▓█  ▄ ▒██░    ▒▓▓▄ ▄██▒▒██   ██░▒██    ▒██ ▒▓█  ▄ 
    ░░██▒██▓ ░▒████▒░██████▒▒ ▓███▀ ░░ ████▓▒░▒██▒   ░██▒░▒████▒
    ░ ▓░▒ ▒  ░░ ▒░ ░░ ▒░▓  ░░ ░▒ ▒  ░░ ▒░▒░▒░ ░ ▒░   ░  ░░░ ▒░ ░
      ▒ ░ ░   ░ ░  ░░ ░ ▒  ░  ░  ▒     ░ ▒ ▒░ ░  ░      ░ ░ ░  ░
      ░   ░     ░     ░ ░   ░        ░ ░ ░ ▒  ░      ░      ░   
        ░       ░  ░    ░  ░░ ░          ░ ░         ░      ░  ░
                            ░                                   
    Servidor rodando em http://${HOST}:${PORT}
  `);
}); 

module.exports = server;