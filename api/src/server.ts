import "reflect-metadata";
import express, {Request,Response,NextFunction} from "express";
import { router } from "./routes";
import "./database";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
           error: err.message
        });
    }
});

app.listen(3333, '0.0.0.0');