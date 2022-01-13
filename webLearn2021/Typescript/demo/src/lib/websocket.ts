import { EventEmitter } from 'eventemitter3';

export enum WebsocketEventType {
    ON_MESSAGE = 'onMessage',
    ON_OPEN = 'onOpen',
    ON_ERROR = 'onError',
    ON_CLOSE = 'onClose',
}

export type MWebsocketParamsType = {
    [key: string]: any[];
};

type WebSocketEventArgsMap = {
    [WebsocketEventType.ON_CLOSE]: [CloseEvent];
    [WebsocketEventType.ON_ERROR]: [Event];
    [WebsocketEventType.ON_OPEN]: [Event];
    [WebsocketEventType.ON_MESSAGE]: [MessageEvent];
};

export class MWebsocket<T extends MWebsocketParamsType = any> extends EventEmitter<WebSocketEventArgsMap | T> {
    protected wsUrl: string = '';

    private websocket: WebSocket | null = null;

    private manualClosed: boolean = false;

    constructor() {
        super();
    }

    public connect() {
        if (this.websocket?.CONNECTING) {
            this.close();
        }
        this.websocket = new WebSocket(this.wsUrl);
        this.websocket.onmessage = this.onMessage.bind(this);
        this.websocket.onopen = this.onOpen.bind(this);
        this.websocket.onclose = this.onClose.bind(this);
        this.websocket.onerror = this.onError.bind(this);
    }

    public send(data: any) {
        if (this.manualClosed) {
            return;
        }
        this.websocket?.send(JSON.stringify(data));
    }

    public close() {
        this.manualClosed = true;
        this.websocket?.close();
    }

    private onMessage(messageEvent: MessageEvent) {
        let data = messageEvent.data;
        try {
            data = JSON.parse(data as any);
        } catch (e) {}
        this.emit(WebsocketEventType.ON_MESSAGE, { ...messageEvent, data });
    }

    private onClose(event: CloseEvent) {
        if (!this.manualClosed) {
            this.emit(WebsocketEventType.ON_CLOSE, event);
            this.connect();
        }
    }

    private onOpen(event: Event) {
        this.manualClosed = false;
        this.emit(WebsocketEventType.ON_OPEN, event);
    }

    private onError(event: Event) {
        this.emit(WebsocketEventType.ON_ERROR, event);
    }
}
