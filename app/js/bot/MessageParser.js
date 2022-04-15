class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.handleHello();
    }

    if (lowerCaseMessage.includes("exit")) {
      this.actionProvider.handleExit();
    }
  }
}

export default MessageParser;
