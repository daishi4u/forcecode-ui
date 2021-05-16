import { LightningElement, api } from 'lwc';

/**
 * export const defaultOptions: Config = {
  alias: '',
  apiVersion: getVSCodeSetting(VSCODE_SETTINGS.defaultApiVersion),
  deployOptions: {
    allowMissingFiles: true,
    checkOnly: false,
    ignoreWarnings: true,
    purgeOnDelete: false,
    rollbackOnError: true,
    runTests: [],
    singlePackage: true,
    testLevel: 'Default',
  },
  isDeveloperEdition: false,
  overwritePackageXML: false,
  poll: 2000,
  pollTimeout: 1200,
  prefix: '',
  showTestCoverage: true,
  spaDist: '',
  src: 'src',
  staticResourceCacheControl: 'Private',
};
 */ 

export default class Settings extends LightningElement {
    currentUserName;
    currentSettings;
    _userNames;
    _event;

    get userNames() {
        return this._userNames.filter((uName) => uName !== this.currentUserName);
    }

    @api 
    set event(event) {
        this._event = event;
        this.currentUserName = event.data.currentUserName;
        this.currentSettings = event.data.currentSettings;
        this._userNames = event.data.userNames;
    }

    get event() {
        return this._event;
    }

    get showRemoveConfig() {
        return this.currentSettings.username !== this.currentUserName;
    }

    changeSetting(event) {
        let settingName = event.currentTarget.name;
        let settingValue = event.currentTarget.value;
        let sendObj = {};
        sendObj[settingName] = settingValue;
        this.sendMessage(sendObj);
    }

    saveSettings() {
        this.sendMessage({ save: true });
    }

    removeConfig() {

    }

    changeUserName(event) {
        let newUserName = event.target.value;
        this.sendMessage({ switchUsername: true, username: newUserName });
    }

    sendMessage(data) {
        this.dispatchEvent(new CustomEvent('sendmessage', { data: data }));
    }
}
