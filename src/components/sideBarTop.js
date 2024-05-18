import React from 'react'
import LOGO from "../assets/brand-dot-ai.svg";
import addbtn from "../assets/add-30.png";
import msgIcon from "../assets/message.svg";


export default function sideBarTop({handlequery}) {
  return (
      <div className="upperside">
        <div className="uppersideTop">
          <img src={LOGO} alt="" className="LOGO" />
          <span className="brand">
            Open.AI <span className="brandsm">powered by Agoon</span>
          </span>
        </div>
        <button className="midbtn" onClick={() => {window.location.reload()}}>
          <img src={addbtn} className="addbtn" alt="" />
          New Chat
        </button>
        <div className="uppersideButton">
          <button className="query" onClick={() => handlequery("What is Myanmar")}>
                <img src={msgIcon} alt="query1" />
                What is Myanmar?
          </button>
          <button className="query" onClick={()=> handlequery("Where is Shan State")}>
            <img src={msgIcon} alt="query2" />
            Where is Shan State?
          </button>
        </div>
      </div>
    
  )
}
