import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { router as usuariosRouter } from '../routes/usuarios.js';
import { dbConnection } from '../database/config.js';






class Server{


    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

 
        // middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares(){
        
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));

    }

    routes(){

      this.app.use(this.usuariosPath, usuariosRouter);  

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


export {
    Server
};