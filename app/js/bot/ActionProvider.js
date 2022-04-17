import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleMessage(inquiry) {
    //axios.post('http://34.233.123.70:5001/inquiry?inquiry=' + inquiry)
    axios.post('http://localhost:3000/api/inquiry?inquiry=' + inquiry)
      .then(resp => {
        var botMessage;
        //console.log(resp);
        if (resp.data.widget == 'buttons') {
          console.log(resp.data.choices);

          botMessage = this.createChatBotMessage(resp.data.text, {widget: 'buttons'});
          console.log(botMessage);

          this.setState((prevState) => ({
            ...prevState,
            choices: resp.data.choices,
          }));

        } else {
          botMessage = this.createChatBotMessage(resp.data.text);
        }
        this.updateChatbotState(botMessage);
      });
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
