import { SEQ_KEY, SEQ_URL } from "$env/static/private";
import * as seq from "seq-logging";
import {
	type LogHandler,
	type LogHandlerOptions,
	LogLevelDebug,
	LogLevelError,
	LogLevelInfo,
	LogLevelWarn,
	type LogMessage,
	Logger,
	LoggerConsoleHandler,
	renderMessages,
} from "zeed";

const server = Logger("simple-budget-server");

const seqlogger = new seq.Logger({
	serverUrl: SEQ_URL,
	apiKey: SEQ_KEY,
	onError: (e) => {
		console.error(e);
	},
});

function LoggerSeqHandler(opt: LogHandlerOptions): LogHandler {
	return (msg: LogMessage) => {
		console.log(msg);
		if (msg.level < (opt.level ?? LogLevelDebug)) return;
		const name = msg.name || "";
		const message = (name ? `[${name}] ` : "") + renderMessages(msg.messages);
		switch (msg.level) {
			case LogLevelError:
				seqlogger.emit({
					timestamp: new Date(msg.timestamp ?? new Date()),
					level: "Error",
					messageTemplate: message,
				});
				break;
			case LogLevelWarn:
				seqlogger.emit({
					timestamp: new Date(msg.timestamp ?? new Date()),
					level: "Warn",
					messageTemplate: message,
				});
				break;
			case LogLevelInfo:
				seqlogger.emit({
					timestamp: new Date(msg.timestamp ?? new Date()),
					level: "Info",
					messageTemplate: message,
				});
				break;
			case LogLevelDebug:
				seqlogger.emit({
					timestamp: new Date(msg.timestamp ?? new Date()),
					level: "Debug",
					messageTemplate: message,
				});
				break;
		}
	};
}

server.factory?.setHandlers([LoggerConsoleHandler, LoggerSeqHandler]);

export const serverlog = server;
