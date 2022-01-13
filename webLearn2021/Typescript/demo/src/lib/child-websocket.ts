import { WebsocketEventType } from '../lib/websocket';
import { MWebsocket } from '../lib/websocket';

export enum ChildWebsocketEventType {
    ON_COMMENT_MESSAGE = 'onCommentMessage',
    ON_TEST_MESSAGE = 'onTestMessage',
    ON_XXXX_MESSAGE = 'onXxxxxMessage',
}

enum MessageType {
    COMMENT,
    TEST,
    XXXX,
}

interface MessageInfo {
    type: MessageType;
    content: any;
}

type ChildWebSocketEventArgsMap = {
    [ChildWebsocketEventType.ON_COMMENT_MESSAGE]: [string];
    [ChildWebsocketEventType.ON_TEST_MESSAGE]: [number];
    [ChildWebsocketEventType.ON_XXXX_MESSAGE]: [string];
};

export class LiveWebsocketService extends MWebsocket<ChildWebSocketEventArgsMap> {
    public static getIntance() {
        if (!LiveWebsocketService.pInstance) {
            LiveWebsocketService.pInstance = new LiveWebsocketService();
        }
        return LiveWebsocketService.pInstance;
    }

    private static pInstance: LiveWebsocketService | null = null;

    private constructor() {
        super();
    }

    public async init() {
        try {
            this.wsUrl = await this.getWsUrl();
            this.initListener();
            this.connect();
        } catch (e) {
        }
    }

    public initListener() {
        this.on(WebsocketEventType.ON_MESSAGE, this.handleMessage);
    }

    private handleMessage(messageEvent: MessageEvent<MessageInfo>) {
        const data = messageEvent.data;
        switch (data.type) {
            case MessageType.COMMENT: {
                this.emit(ChildWebsocketEventType.ON_COMMENT_MESSAGE, data.content);
                break;
            }
            case MessageType.TEST: {
                this.emit(ChildWebsocketEventType.ON_TEST_MESSAGE, data.content);
                break;
            }
            case MessageType.XXXX: {
                this.emit(ChildWebsocketEventType.ON_XXXX_MESSAGE, data.content);
                break;
            }
        }
    }

    private async getWsUrl() {
        return `wss://xxxxxx`;
    }
}
