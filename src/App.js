import React, { useEffect, useRef, useState } from "react";
import home from "../src/assets/home.svg";
import save from "../src/assets/bookmark.svg";
import rocket from "../src/assets/rocket.svg";
import sendbtn from "../src/assets/send.svg";
import usericon from "../src/assets/profile.jpg";
import chatgpt from "../src/assets/branded.svg";
import { sendMsgToOpenAI } from "./openai";
import "./App.css";
import SideBarTop from "./components/sideBarTop";

export default function App() {
  const msgEnd= useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am Open.AI, Feel free to ask anything (developed by Agoon) ",
      isBot: true,
    },
  ]);

  useEffect(()=> {
    
      msgEnd.current.scrollIntoView()
  },[messages])

  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
    console.log(res); // Log the response to the console
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleEnter =async(e)=> {
    if(e.key === 'Enter')  await handleSend();
  }
  const handlequery = async (text) => {
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };
  return (
    <div className="APP">
    <button className="sidebar-toggle" onClick={toggleSidebar}>
      ☰
    </button>
    <div className={`sidebar ${sidebarVisible ? "show" : ""}`}>
      <SideBarTop handlequery={handlequery}/>
        <div className="lowerside">
          <div className="listItem">
            <img src={home} className="listItemImage" alt="Home" />
            Home
          </div>
          <div className="listItem">
            <img src={save} className="listItemImage" alt="Save" />
            Saved
          </div>
          <div className="listItem">
            <img src={rocket} className="listItemImage" alt="rocket" />
            Upgrade to Pro
          </div>
        </div>
      </div>



      <div className="main">
        <div className="chats" >
       
          {messages.map((message, i) => (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                src={message.isBot ? chatgpt : usericon}
                className="chatimg"
                alt=""
              />
              <p className="txt">{message.text}</p>
            </div>
            
          ))}
           <div ref={msgEnd}/>
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder="send a message..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendbtn} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}