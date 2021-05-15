import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
    vscode;

    // controls which component to show. should be set with the first message recieved
    showSettings = false;
    showBulkLoader = false;
    showQueryEditor = false;

    @track currentMessageEvent;

    connectedCallback() {
        if (typeof acquireVsCodeApi === 'function') {
            this.vscode = acquireVsCodeApi(); // eslint-disable-line
            window.addEventListener('message', this.handleIncomingMessage);
        }
    }

    handleIncomingMessage(event) {
        let data = event.data;
        // === will only be sent when first opened ===
        if(data.showSettings) {
            this.showSettings = true;
        } else if(data.showBulkLoader) {
            this.showBulkLoader = true;
        } else if(data.showQueryEditor) {
            this.showQueryEditor = true;
        }
        // ===========================================
        this.currentMessageEvent = event;
    }
}
