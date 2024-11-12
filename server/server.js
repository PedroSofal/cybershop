import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';

const server = jsonServer.create();

const filePath = path.join(process.cwd(), 'db.json');
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db);
// const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users' && req.body.username) {
    const { username } = req.body;

    const userExists = router.db.get('users').find({ username }).value();

    if (userExists) {
      return res.status(409).json({ message: 'Nome de usuário já existe' });
    }
  }

  next();
});

server.use((req, res, next) => {
  const isOrderIdPath = /^\/orders\/\d+$/.test(req.path);

  if (req.method === 'GET' && isOrderIdPath) {
    const orderId = req.path.split('/').pop();
    const userId = req.headers['user-id'];

    const order = router.db.get('orders').find(order => order.id == orderId).value();

    if (!order || order.userId != userId) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
  }

  next();
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

server.use(router);

server.listen(3000, () => {
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
  `);
});

export default server;