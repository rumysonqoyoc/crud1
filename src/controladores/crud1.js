import {pool} from '../db.js';
export const get_boys=async(req,res)=>{
    try{
        const [resultado]=await pool.query('select * from boys');
        res.json(resultado);
    }catch(error){
        return res.status(500).json({mensaje:'algo salio mal'});
    }
    
}

export const get_boy=async(req,res)=>{
    try{
        console.log(req.params.id);
        const [resultado]=await pool.query('select * from boys where id_boy = ?',[req.params.id]);
        if(resultado.length<=0) return res.status(404).json({mensage:'menor no encontrado'});
        res.json(resultado);
    }catch(error){
        return res.status(500).json({mensaje:'algo salio mal'});
    }

    
}

export  const crear=async (req, res)=>{
    try{
        const {dni, paterno, materno, nombre, sexo, fecha_nacimiento, direccion, referencia }=req.body;
        const [fila]=await pool.query('insert into boys (dni, paterno, materno, nombre, sexo, fecha_nacimiento, direccion, referencia) values(?,?,?,?,?,?,?,?)',[dni, paterno, materno, nombre, sexo, fecha_nacimiento, direccion, referencia]);
        res.send({fila});
    }catch(error){
        return res.status(500).json({mensaje:'algo salio mal'});
    }

    
};

export const actualizar=async (req, res)=>{
    try{
        const {id}=req.params;
        const {dni, paterno, materno, nombre, sexo, fecha_nacimiento, direccion, referencia}=req.body;
        console.log(id, dni, paterno, materno, nombre, sexo, fecha_nacimiento, direccion, referencia);
        const [resultado]=await pool.query('update boys set dni=ifnull(?,dni), paterno=ifnull(?, paterno), materno=ifnull(?, materno), nombre=ifnull(?,nombre), sexo=ifnull(?,sexo), fecha_nacimiento=ifnull(?,fecha_nacimiento), direccion=ifnull(?, direccion), referencia=ifnull(?,referencia) where id_boy=?',[dni, paterno, materno, nombre, sexo, fecha_nacimiento, direccion, referencia, id])
        if(resultado.affectedRows === 0){
            return res.status(404).json({mensaje:'registro no encontrado'});
        }else {return res.send('registro actualizado');}
    }catch(error){
        return res.status(500).json({mensaje:'algo salio mal'});
    }
}

export const eliminar=async (req, res)=>{
    try{
        const [resultado] = await pool.query('delete from boys where id_boy=?', [req.params.id]);
        if(resultado.affectedRows <=0){
            return res.status(404).json({mensaje:'registro no encontrado'});
        }else{
            console.log(resultado);
            res.send('registro eliminado');
            //res.sendStatus(204);
        }
    }
    catch(error){
        return res.status(500).json({mensaje:'algo salio mal'});
    }
};


