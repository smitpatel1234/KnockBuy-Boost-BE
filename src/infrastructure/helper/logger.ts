import httpContext from "express-http-context";
import Winston,{format} from 'winston'
export let logger = undefined as unknown as Winston.Logger;
export const createLoggerInstance = ()=>{
    logger = Winston.createLogger({
        level: 'info',
        format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.errors({ stack: true }),
            format.json()
        ),
        silent: false,
        defaultMeta: { service: 'user-service' },
        transports: [
          new Winston.transports.Console(),
        ],
    })
}