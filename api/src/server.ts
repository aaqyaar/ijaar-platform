import App from './app';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 8000;

const routesDir = path.join(__dirname, 'routes');
const routeFiles = fs.readdirSync(routesDir);

const routes = [];
for (const file of routeFiles) {
  const Route = require(path.join(routesDir, file)).default;
  routes.push(new Route());
}

const app = new App({
  port: PORT as number,
  routes,
});

app.listen();
