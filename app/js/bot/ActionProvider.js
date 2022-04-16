import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleMessage(inquiry) {
    axios.get('http://localhost:3000/api/inquiry/' + inquiry)
      .then(resp => {
        console.log(resp.data);

        const botMessage = this.createChatBotMessage(resp.data.data);
        this.updateChatbotState(botMessage);
      });
  }

  handleJavascriptList() {
    const message = this.createChatBotMessage(
      'Fantastic, I\'ve got the following resources for you on Javascript:',
      {
        widget: 'javascriptLinks',
      }
    );

    this.updateChatbotState(message);
  }

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
