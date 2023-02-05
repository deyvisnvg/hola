import express, { type Application } from "express";
import cors from "cors";
import routes from "./routes";

const { v4 } = require('uuid');

const app: Application = express();

app.get('/api', (req, res) => {
    const path = `/api/item/${v4()}`;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
routes(app);

export default app;