import React, { useState, useEffect, useCallback } from "react";
import chipImage from "./Images/chip.png";
import visa from "./Images/visa.png";
import mastercard from "./Images/mastercard.png";
import amex from "./Images/amex.png";
import discover from "./Images/discover.png";
import maestro from "./Images/maestro.png";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [displaynum, setDisplaynum] = useState("#### #### #### ####");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dismonth, setDMonth] = useState("MM");
  const [disyear, setDYear] = useState("YYYY");
  const [cvv, setCvv] = useState("");
  const [img, setImage] = useState(visa);

  function getCardType(cardNum) {
    var payCardType = "";
    var regexMap = [
      { regEx: /^4[0-9]{5}/gi, cardType: "VISA" },
      { regEx: /^5[1-5][0-9]{4}/gi, cardType: "MASTERCARD" },
      { regEx: /^(?:6011\d{12})|(?:65\d{14})/gi, cardType: "DISCOVER" },
      { regEx: /^3[47][0-9]{3}/gi, cardType: "AMEX" },
      { regEx: /^(5[06-8]\d{4}|6\d{5})/gi, cardType: "MAESTRO" },
    ];

    for (var j = 0; j < regexMap.length; j++) {
      if (cardNum.match(regexMap[j].regEx)) {
        payCardType = regexMap[j].cardType;
        break;
      }
    }

    if (
      cardNum.indexOf("50") === 0 ||
      cardNum.indexOf("60") === 0 ||
      cardNum.indexOf("65") === 0
    ) {
      var g = "508500-508999|606985-607984|608001-608500|652150-653149";
      var i = g.split("|");
      for (var d = 0; d < i.length; d++) {
        var c = parseInt(i[d].split("-")[0], 10);
        var f = parseInt(i[d].split("-")[1], 10);
        if (
          cardNum.substr(0, 6) >= c &&
          cardNum.substr(0, 6) <= f &&
          cardNum.length >= 6
        ) {
          payCardType = "RUPAY";
          break;
        }
      }
    }
    return payCardType;
  }
  function setImagefn(card) {
    if (card == "AMEX") setImage(amex);
    else if (card == "VISA") setImage(visa);
    else if (card == "DISCOVER") setImage(discover);
    else if (card == "MAESTRO") setImage(maestro);
    else if (card == "MASTERCARD") setImage(mastercard);
    else {
      setImage(visa);
      console.log("hi");
      return false;
    }
    return true;
  }
  useEffect(() => {
    /* to add years in the Year dropdown*/
    var _select = document.getElementById("year");
    for (let i = 2021; i <= 2050; i++) {
      var option = document.createElement("option");
      option.text = i;
      _select.add(option);
    }
  }, []);
  function handleCardOver(e) {
    document.getElementById("cardnum").style.border = "1px solid white";
  }
  function handleCardOut(e) {
    document.getElementById("cardnum").style.border = "";
  }
  function handleNameOver(e) {
    document.getElementById("namediv").style.border = "1px solid white";
  }
  function handleNameOut(e) {
    document.getElementById("namediv").style.border = "";
  }
  function handleExpiryOver(e) {
    document.getElementById("expirydiv").style.border = "1px solid white";
  }
  function handleExpiryOut(e) {
    document.getElementById("expirydiv").style.border = "";
  }
  function handleCvvOver(e) {
    document.getElementsByClassName("flipcardinner")[0].style.transform =
      "rotateY(180deg)";
  }
  function handleCvvOut(e) {
    document.getElementsByClassName("flipcardinner")[0].style.transform = "";
  }
  function handleMonthChange(e) {
    setMonth(e.target.value);
    var m = e.target.value;
    if (m != "Month") setDMonth(m);
    else setDMonth("MM");
  }
  function handleYearChange(e) {
    setYear(e.target.value);
    var y = e.target.value;
    if (y != "Year") setDYear(y);
    else setDYear("YYYY");
  }
  function handleCvvChange(e) {
    var cvv = e.target.value;
    if (cvv.match(/^[0-9]*$/gi)) setCvv(e.target.value);
  }

  function cc_format(value) {
    var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || "";
    var parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  }
  function handleCardNumChange(e) {
    var m_card_num = e.target.value;
    if (m_card_num.match(/^[0-9 ]*$/gi)) {
      var c_num_str = m_card_num.replace(/ /g, "");
      var card_num = cc_format(m_card_num);
      setNumber(card_num);
      var card_type = getCardType(c_num_str);
      var card_val = setImagefn(card_type);
      if (c_num_str.length == 16 && card_val == false) {
        setNumber("");
        setDisplaynum("#### #### #### ####");
        alert("Invalid Credit Card Number");
      } else {
        var len = 16 - c_num_str.length;
        for (let i = 0; i < len; i++) {
          c_num_str += "#";
        }
        var k = c_num_str.split("");
        for (let i = 4; i <= 16; i = i + 4) {
          k.splice(i, 0, " ");
          i = i + 1;
        }
        c_num_str = k.join("");
        setDisplaynum(c_num_str);
        document.getElementById("cardnum").style.animation =
          "fadeinout 4s linear 1 forward";
      }
    }
  }
  return (
    <div className="App">
      <div className="flipcard">
        <div className="flipcardinner">
          <div className="creditcardfront">
            <span
              style={{ height: "40px", marginRight: "75%", marginTop: "15px" }}
            >
              <img
                src={chipImage}
                style={{ height: "40px", marginTop: "15px" }}
              ></img>
            </span>
            <span
              style={{
                height: "35px",
                marginLeft: "65%",
                display: "inline-block",
              }}
            >
              {img == discover ? (
                <img
                  src={img}
                  style={{ height: "25px", width: "110px", marginTop: "-30px" }}
                ></img>
              ) : (
                <img
                  src={img}
                  style={{
                    height: "inherit",
                    display: "inherit",
                    marginTop: "-30px",
                  }}
                ></img>
              )}
            </span>
            <br></br>
            <div
              style={{
                color: "#f0f0f0",
                fontSize: "23px",
                fontFamily: "courier",
                border: "1px",
              }}
            >
              <label id="cardnum">{displaynum}</label>
            </div>
            <br></br>
            <div id="namediv">
              <label className="cardlabel">Card Holder</label>
              <br></br>
              <span
                style={{
                  color: "white",
                  textTransform: "uppercase",
                  fontSize: "medium",
                }}
              >
                {name}
              </span>
              <br></br>
            </div>
            <div id="expirydiv">
              <label className="cardlabel">Expires</label>
              <br></br>
              <span style={{ color: "white" }}>{dismonth}/</span>
              <span style={{ color: "white" }}>{disyear}</span>
            </div>
          </div>
          <div className="creditcardback">
            <h2
              style={{
                backgroundColor: "#000000",
                width: "100%",
                color: "black",
              }}
            >
              ..
            </h2>
            <label id="cvvlabel">CVV</label>
            <p id="cvvstrip">{cvv}</p>
            <div>
              {img == discover ? (
                <img
                  src={img}
                  style={{ height: "25px", width: "110px", marginLeft: "65%" }}
                ></img>
              ) : (
                <img
                  src={img}
                  style={{ height: "35px", marginLeft: "65%" }}
                ></img>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="carddetails">
        <div className="carddetailsinner" style={{ marginTop: "1cm" }}>
          <label style={{ marginRight: "83%" }}>Card Number</label>
          <br></br>
          <input
            style={{ width: "100%" }}
            id="cardnumber"
            type="text"
            name="number"
            value={number}
            onChange={handleCardNumChange}
            onMouseOver={handleCardOver}
            onMouseOut={handleCardOut}
            maxlength="19"
            inputm
          />
          <br></br>
          <label style={{ marginRight: "86%" }}>Card Name</label>
          <br></br>
          <input
            style={{ width: "100%" }}
            id="cardname"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onMouseOver={handleNameOver}
            onMouseOut={handleNameOut}
            maxLength="25"
          />
          <br></br>
          <label style={{ marginRight: "77%" }}>Expiration Date</label>
          <label>Cvv</label>
          <br></br>
          <select
            style={{ width: "110px" }}
            id="month"
            type="number"
            name="number"
            placeholder="Month"
            min="1"
            max="12"
            value={month}
            onChange={handleMonthChange}
            onMouseOver={handleExpiryOver}
            onMouseOut={handleExpiryOut}
          >
            <option>Month</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>

          <select
            style={{ width: "110px" }}
            id="year"
            type="number"
            name="number"
            placeholder="Year"
            min="2021"
            max="2040"
            value={year}
            onChange={handleYearChange}
            onMouseOver={handleExpiryOver}
            onMouseOut={handleExpiryOut}
          >
            <option>Year</option>
          </select>

          <input
            style={{ width: "240px" }}
            id="cvv"
            type="tel"
            name="number"
            value={cvv}
            onChange={handleCvvChange}
            onMouseOver={handleCvvOver}
            onMouseOut={handleCvvOut}
            maxLength="3"
          />
          <br></br>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
