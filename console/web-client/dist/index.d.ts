import { Observable } from 'rxjs';
/**
 * Console client application API
 */
export declare class ConsoleClient {
    private socket;
    private scope;
    /**
     * Connects to Console server instance
     * @param address
     */
    connect(address: string, scope?: string[]): void;
    /**
     * Sends user messages
     * @param message
     */
    sendUserMessage(message: IUserMessage): void;
    /**
     * Subscribe to user messages
     */
    onUserMessage(): Observable<IUserMessage>;
    send(event: string, payload?: any): void;
    onEvent(event: Event): Observable<any>;
}
export interface IScoped {
    /**
     * Application or sub system scope
     */
    target?: string[];
    /**
     * Targeted user or group to recieve message
     */
    userGroup?: string[];
}
export interface IAlert {
}
export interface IEmail {
    message: string;
}
/**
 * Common user message interface supported by console server
 */
export interface IUserMessage {
    /**
     * User responsible for the message sent
     */
    userId: string;
    /**
     * Brief description of message
     */
    subject: string;
    /**
     * Type of message infers how it is handled
     */
    type: string;
    /**
     * Payload data
     */
    data: IAlert | IEmail;
    /**
     * Intended targets for this message
     */
    scope: IScoped;
}
