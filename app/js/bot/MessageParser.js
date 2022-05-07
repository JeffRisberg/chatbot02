class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message === "ADMIN") {
      this.actionProvider.handleAdmin();
    } else {
      this.actionProvider.handleMessage(message);
    }
  }
}

export default MessageParser;
