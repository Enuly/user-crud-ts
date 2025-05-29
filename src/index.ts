import express, { Request, Response } from 'express'; 

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.get('/', (req: Request, res: Response) => {
    res.send('Servidor Funcionando...');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${3000}`);
});