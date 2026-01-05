import Winston,{format} from 'winston'
export let logger = undefined as unknown as Winston.Logger;
export const createLoggerInstance = ()=>{
    logger = Winston.createLogger({
        defaultMeta: { service: 'user-service' },
        format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.errors({ stack: true }),
            format.json()
        ),
        level: 'info',
        silent: false,
        transports: [
          new Winston.transports.Console(),
        ],
    })
}