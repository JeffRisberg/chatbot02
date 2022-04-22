import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleMessage(inquiry) {
    //axios.post('http://coach.ai:5001/inquiry?inquiry=' + inquiry)
    axios.post('http://localhost:3000/api/inquiry?inquiry=' + inquiry)
      .then(resp => {
        const text = resp.data.text;
        const widget = resp.data.widget;
        const choices = resp.data.choices;
        const active = resp.data.active;
        var botMessage;

        if (widget === 'buttons') {
          botMessage = this.createChatBotMessage(text, {widget: 'buttons',
            payload: {choices: choices, active: active}});
        } else if (widget === 'linkList') {
          botMessage = this.createChatBotMessage(text, {widget: 'linkList',
            payload: {choices: choices, active: active}});
        } else {
          botMessage = this.createChatBotMessage(text);
        }
        this.updateChatbotState(botMessage);
      });
  }

  handleClickButton(e) {
    var id = e.target.id;
    this.handleMessage(id);
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
