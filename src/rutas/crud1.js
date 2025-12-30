import {Router} from 'express';
import {actualizar, crear, eliminar, get_boys, get_boy} from '../controladores/crud1.js';
export const ruta=Router();

ruta.get('/get_boys',get_boys);
ruta.get('/get_boy/:id',get_boy);
ruta.post('/crear',crear);
ruta.patch('/actualizar/:id',actualizar);
ruta.delete('/eliminar/:id',eliminar);