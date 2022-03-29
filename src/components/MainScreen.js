import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css";

function MainScreen(props) {
  const { mockData } = props;
  const navigate = useNavigate();

  const routeHandler = (item) => {
    navigate(`/${item.order}`);
  };

  const msgObjectToArray = (obj) => {
    return Object.values(obj)
      .map((item) => item.message)
      .slice(-1)[0];
  };

  const sortedData = mockData.sort((a, b) => a.order - b.order);

  return (
    <div className="wrapper">
      <div className="chat-wrapper">
        <div className="chat-header">
          <h1>Chat</h1>
        </div>
        <div className="chat-list">
          {sortedData &&
            sortedData.map((item, index) => {
              return (
                <div
                  className="chat-item"
                  key={index}
                  onClick={() => routeHandler(item)}
                >
                  <div className="chat-item-image">
                    <img src={item.imagePath} />
                  </div>
                  <div>
                    <div className="chat-item-name">{item.name}</div>
                    <div className="chat-item-message">
                      {item.sentMessages
                        ? msgObjectToArray(item.sentMessages)
                        : item.receivedMessages.slice(-1)[0]}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
