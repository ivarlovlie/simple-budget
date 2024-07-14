import { type LogLevel, Logger, type LogHandler, type LogMessage, LogLevelDebug, LoggerNodeHandler } from 'zeed'

export const log = Logger('default')

function seqHandler(level: LogLevel = LogLevelDebug): LogHandler {
	return (msg: LogMessage) => {
		if (msg.level < level) return
	}
}
