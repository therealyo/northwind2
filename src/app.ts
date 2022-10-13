import express, { Application } from 'express';
import cors from 'cors';
import { Controller } from './interfaces/IController';
import { errorHandler } from './middlewares/errorHandler.middleware';

class App {
    public app: Application;
    public port: number;

    constructor(controllers: Controller[], port?: string) {
        this.app = express();
        this.port = port ? Number(port) : 3000;

        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    private initControllers = (controllers: Controller[]) => {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    };

    private initMiddleware = () => {
        this.app.use(
            cors({
                origin: '*'
            })
        );
        this.app.use(express.json());
    };

    private initErrorHandling = () => {
        this.app.use(errorHandler);
    };

    public listen = () => {
        this.app.listen(this.port);
        return `listening on ${this.port}`;
    };
}

export default App;
