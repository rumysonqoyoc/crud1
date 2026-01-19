import express from 'express';
import cors from 'cors';

import {ruta} from './rutas/crud1.js';

const app=express();

app.use(cors());
app.use(express.json());
app.use('/api',ruta);

app.use((req,res,next)=>{
    res.status(404).json({
        mensaje:'ruta no encontrada'
    })
});

export default app;