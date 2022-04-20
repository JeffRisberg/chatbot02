class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message);

    const lowerCaseMessage = message.toLowerCase();

    this.actionProvider.handleMessage(lowerCaseMessage);
  }
}

export default MessageParser;
