class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHello() {
    const botMessage = this.createChatBotMessage('Hello. Nice to meet you.');

    this.updateChatbotState(botMessage);
  }

  handleExit() {
    const botMessage = this.createChatBotMessage('Ok, let\'s start over.');

    this.updateChatbotState(botMessage);
  }

  handleJavascriptList() {
    const message = this.createChatBotMessage(
      'Fantastic, I\'ve got the following resources for you on Javascript:',
      {
        widget: 'javascriptLinks',
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component.
    // The setState function here actually manipulates the top level state of the Chatbot, so it's important
    // that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
