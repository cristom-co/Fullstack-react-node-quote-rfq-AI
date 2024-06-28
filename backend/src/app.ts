import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import rfqRoutes from './routes/rfqRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/rfq', rfqRoutes);

export default app;
