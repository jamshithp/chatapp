import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import * as VscIcons from "react-icons/vsc";

function SingleChat(props) {
    const { dataHandler, mockData } = props;
    const { pathname } = useLocation();
    const orderId = Number(pathname.slice(1));
    const navigate = useNavigate();

    const userData = mockData.filter((item) => item.order === Number(orderId));

    const aIndex = mockData.findIndex(
        (item) => item.order === userData[0].order
    );

    const submitHandler = (e) => {
        e.preventDefault();
        const mess = e.target[0].value;
        if (mess.length > 0) {
            dataPoster(mess);
        }
        e.target[0].value = null;
    };

    const chatUrl = (index) => {
        return `https://auth-d00f9-default-rtdb.firebaseio.com/mess/${index}/sentMessages.json`;
    };

    const dataPoster = async (message) => {
        const res = await axios.post(chatUrl(aIndex), { message });
        dataHandler(res.data);
    };

    const routeHandler = (item) => {
        navigate(`/home`);
    };

    return (
        <div className="single-chat-wrapper">
            {userData &&
                userData.map((item, index) => {
                    return (
                        <div key={index} className="chat-wrapper">
                            <div className="chat-header">
                                <div className="user-head">
                                    <div
                                        onClick={routeHandler}
                                        className="chat-arrow"
                                    >
                                        <AiIcons.AiOutlineArrowLeft size={20} />
                                    </div>
                                    <div className="chat-item-image">
                                        <HiIcons.HiOutlineUserCircle
                                            size={30}
                                        />
                                    </div>
                                    <h2>{item.name}</h2>
                                </div>
                                <BiIcons.BiSearch size={25} />
                            </div>
                            <div className="user-chat-wrapper">
                                <div className="message-data align-right">
                                    <span className="message-data-time">
                                        10:10 AM, Today
                                    </span>{" "}
                                    &nbsp; &nbsp;
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
                                    <span className="message-data-time">
                                        10:12 AM, Today
                                    </span>
                                </div>
                                {item.sentMessages &&
                                    Object.values(item.sentMessages).map(
                                        (item, index) => {
                                            return (
                                                <div
                                                    className="message my-message"
                                                    key={index}
                                                >
                                                    {item.message}
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                            <div>
                                <div className="edit-icons-wrapper">
                                    <BsIcons.BsTypeBold />
                                    <BiIcons.BiItalic />
                                    <BiIcons.BiUnderline />
                                    <MdIcons.MdFormatListBulleted />
                                    <AiIcons.AiOutlineAlignLeft />
                                    <GrIcons.GrAttachment />
                                </div>
                                <form
                                    onSubmit={submitHandler}
                                    className="chat-message"
                                >
																	<VscIcons.VscSmiley/>
                                    <input
                                        className="chat-message-input"
                                        name="message-to-send"
                                        id="message-to-send"
                                        placeholder="Type your message...."
                                        // rows="1"
                                    ></input>
                                    <button>
                                        <MdIcons.MdSend
                                            color="purple"
                                            size={20}
                                        />
                                    </button>
                                </form>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default SingleChat;
