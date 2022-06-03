import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleMessage(inquiry) {
    //axios.post('http://3.216.97.226:5001/inquiry?inquiry=' + inquiry)
    axios.post('http://localhost:5000/inquiry?inquiry=' + inquiry, null,{
      withCredentials: true,
    })
    //axios.post('http://localhost:3000/api/inquiry?inquiry=' + inquiry)
      .then(resp => {
        const text = resp.data.text;
        const widget = resp.data.widget;
        const choices = resp.data.choices;
        const active = resp.data.active;
        var botMessage;

        console.log(resp.data);

        if (widget === 'buttons') {
          botMessage = this.createChatBotMessage(text, {widget: 'buttons',
            payload: {choices: choices, active: active}});
        } else if (widget === 'linkList') {
          botMessage = this.createChatBotMessage(text, {widget: 'linkList',
            payload: {choices: choices, active: active}});
        } else if (widget === 'table') {
          botMessage = this.createChatBotMessage(text, {widget: 'table', payload: resp.data});
        } else if (widget === 'chart') {
          botMessage = this.createChatBotMessage(text, {widget: 'chart', payload: resp.data});
        } else if (widget === 'text_with_content_update') {
          botMessage = this.createChatBotMessage(text, {widget: 'content_updater', payload: resp.data});
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
    // NOTICE: This function is set in the constructor, and is passed in from the top level ChatbotPage component.
    // The setState function here actually manipulates the top level state of the ChatbotPage, so it's important
    // that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
