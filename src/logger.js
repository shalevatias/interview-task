import winston, { format, transports } from 'winston';

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

const logger = winston.createLogger({
  format: customFormat,
  level: 'info',
  transports: [new transports.Console()],
});

export default logger;
