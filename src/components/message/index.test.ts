import { Message } from './index';
import { expect } from 'chai';

describe('Message', () => {
  it('should render', () => {
    new Message({
        messageDir: "message__left",
        time: "2022-10-15T09:10:05+00:00",
        content: "test",
        user_id: 1234
    });
  });

  it('should have class message + messageDir value', () => {
    const message = new Message({
        messageDir: "message__left",
        time: "2022-10-15T09:10:05+00:00",
        content: "test",
        user_id: 1234
    });
    const className = message.element?.className;

    expect(className).to.be.equal("message message__left")
  });
  it('should display the time correctly', () => {
    const message = new Message({
        messageDir: "message__left",
        time: "2022-10-15T09:10:05+00:00",
        content: "test",
        user_id: 1234
    });
    const time = message.props.time;

    expect(time).to.be.equal("09:10")
  });
});