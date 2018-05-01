import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

/**
 * Console client application API
 */
export class ConsoleClient {
    private socket;
    private scope: string[];
    /**
     * Connects to Console server instance
     * @param address 
     */
    connect(address: string, scope?: string[]) {                        
        this.socket = socketIo(address);
        this.scope = scope;
    }

    /**
     * Sends user messages
     * @param message 
     */
    public sendUserMessage(message: IUserMessage): void {
        this.socket.emit('console.user.message', message);
    }

    /**
     * Subscribe to user messages
     */
    public onUserMessage(): Observable<IUserMessage> {
        return new Observable<IUserMessage>(observer => {
            this.socket.on('console.user.message', (data: IUserMessage) => observer.next(data));
        });
    }

    public send(event: string, payload?: any) {
        this.socket.emit(event, payload);
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, (data?: any) => observer.next(data));
        });
    }
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