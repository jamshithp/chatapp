import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SingleChat(props) {
  const { dataHandler, mockData } = props;
  const { pathname } = useLocation();
  const orderId = Number(pathname.slice(1));

  const userData = mockData.filter((item) => item.order === Number(orderId));

  const aIndex = mockData.findIndex((item) => item.order === userData[0].order);

  const submitHandler = (e) => {
    e.preventDefault();
    const mess = e.target[0].value;
    dataPoster(mess);
    e.target[0].value = null;
  };

  const chatUrl = (index) => {
    return `https://auth-d00f9-default-rtdb.firebaseio.com/mess/${index}/sentMessages.json`;
  };

  const dataPoster = async (message) => {
    const res = await axios.post(chatUrl(aIndex), { message });
    dataHandler(res.data);
  };

  return (
    <div className="single-chat-wrapper">
      {userData &&
        userData.map((item, index) => {
          return (
            <div key={index} className="chat-wrapper">
              <div className="chat-header">
                
                <h2>{item.name}</h2>
              </div>
              <div className="user-chat-wrapper">
                <div className="message-data align-right">
                  <span className="message-data-time">10:10 AM, Today</span>{" "}
                  &nbsp; &nbsp;
                  <span className="message-data-name">{item.name}</span>
                </div>
                {item.receivedMessages.map((message, index) => {
                  return (
                    <div
                      className="message other-message float-right"
                      key={index}
                    >
                      {message}
                    </div>
                  );
                })}
                <div className="message-data">
                  <span className="message-data-time">10:12 AM, Today</span>
                </div>
                {item.sentMessages &&
                  Object.values(item.sentMessages).map((item, index) => {
                    return (
                      <div className="message my-message" key={index}>
                        {item.message}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      <div className="chat-message">
        <form onSubmit={submitHandler}>
          <textarea
            name="message-to-send"
            id="message-to-send"
            placeholder="Type your message"
            rows="3"
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default SingleChat;
