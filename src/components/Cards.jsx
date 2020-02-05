import React from "react";
import axios from "axios";
import "../styles/components/Cards.scss";

const MIN_MINIMUM = 0;
const MIN_MAXIMUM = 240;
const MAX_MINIMUM = 15;
const MAX_MAXIMUM = 265;

class Cards extends React.Component {
  timer = undefined;

  state = {
    cardTypes: ["GOOD", "EVIL"],
    minimumFrequency: 0,
    maximumFrequency: 15,
    currentTime: 0,
    card: null,
    error: false
  };

  selectCardType = type => {
    let { cardTypes } = this.state;

    if (!cardTypes.includes(type)) {
      cardTypes.push(type);
    } else {
      cardTypes.splice(cardTypes.findIndex(t => t === type), 1);
    }

    this.setState({
      cardTypes
    });
  };

  handleMinimumFrequency = evnt =>
    this.setState({
      minimumFrequency: evnt.target.value,
      error: false
    });

  handleMaximumFrequency = evnt =>
    this.setState({
      maximumFrequency: evnt.target.value,
      error: false
    });

  startCardGeneration = () => {
    this.setState({
      card: null
    });

    let { minimumFrequency, maximumFrequency, cardTypes } = this.state;

    if (
      minimumFrequency < MIN_MINIMUM ||
      minimumFrequency > MIN_MAXIMUM ||
      maximumFrequency < MAX_MINIMUM ||
      maximumFrequency > MAX_MAXIMUM ||
      !cardTypes.length
    ) {
      return this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false
      });
    }

    this.generateNextTime();

    this.timer = setInterval(() => {
      this.handleTimerTick();
    }, 1000);

    this.setState({
      timerRunning: true
    });
  };

  generateNextTime = () => {
    const { minimumFrequency, maximumFrequency } = this.state;

    let randomTime =
      Math.random() * (maximumFrequency - minimumFrequency + 1) +
      minimumFrequency;

    randomTime = Math.floor(randomTime * 60);

    this.setState({
      currentTime: randomTime
    });
  };

  handleTimerTick = () => {
    const newTime = this.state.currentTime - 1;

    if (newTime < 0) {
      clearInterval(this.timer);

      this.getCard();
    } else {
      this.setState({
        currentTime: this.state.currentTime - 1
      });
    }
  };

  stopCardGeneration = () => {
    clearInterval(this.timer);

    this.setState({
      timerRunning: false
    });
  };

  getCard = async () => {
    const { data: card } = await axios.get(
      `/api/v1/generate-cards?types=${this.state.cardTypes.join(",")}`
    );

    this.setState({
      card
    });
  };

  render() {
    if (this.state.error) {
      alert(
        "Please make sure the minimum and maximum times you entered are valid, and that you have selected at least 1 card type"
      );

      this.setState({
        error: false
      });
    }

    if (this.state.card) {
      new Audio("/assets/notification.mp3").play();

      alert("A new card has been generated!");

      return (
        <div className="Cards generated">
          <h3 className="title">{this.state.card.title}</h3>
          <h3 className="type">Force of {this.state.card.type}</h3>
          <h3 className="description">{this.state.card.description}</h3>

          <button onClick={this.startCardGeneration}>Restart Timer</button>
          <button onClick={this.getCard}>Get Different Card</button>
        </div>
      );
    }

    return this.state.timerRunning ? (
      <div className="Cards">
        <h1>Time Remaining:</h1>
        <p>{this.state.currentTime} seconds</p>
        <button id="stop-generation-btn" onClick={this.stopCardGeneration}>
          Stop Timer
        </button>
      </div>
    ) : (
      <div className="Cards">
        <h1>Force Card Generator</h1>

        <label htmlFor="card-types">Types of Cards to Generate:</label>
        <div id="card-types" className="card-types">
          <span className="good-container">
            <label htmlFor="good">Force of Good</label>
            <input
              id="good"
              type="checkbox"
              value="GOOD"
              checked={this.state.cardTypes.includes("GOOD")}
              name="Force of Good"
              onChange={evnt => this.selectCardType(evnt.target.value)}
            />
          </span>

          <span className="evil-container">
            <label htmlFor="evil">Force of Evil</label>
            <input
              id="evil"
              type="checkbox"
              value="EVIL"
              checked={this.state.cardTypes.includes("EVIL")}
              name="Force of Evil"
              onChange={evnt => this.selectCardType(evnt.target.value)}
            />
          </span>
        </div>

        <label htmlFor="frequency">Frequency of Card Generation:</label>
        <div id="frequency" className="frequency">
          <span className="minimum-container">
            <label htmlFor="minimum">Minimum</label>
            <input
              type="number"
              placeholder={`Number of Minutes (${MIN_MINIMUM}-${MIN_MAXIMUM})`}
              value={this.state.minimumFrequency}
              min={MIN_MINIMUM}
              max={MIN_MAXIMUM}
              onChange={this.handleMinimumFrequency}
            />
          </span>

          <span className="maximum-container">
            <label htmlFor="maximum">Maximum</label>
            <input
              type="number"
              placeholder={`Number of Minutes (${MAX_MINIMUM}-${MAX_MAXIMUM})`}
              value={this.state.maximumFrequency}
              min={MAX_MINIMUM}
              max={MAX_MAXIMUM}
              onChange={this.handleMaximumFrequency}
            />
          </span>
        </div>

        <button id="start-generation-btn" onClick={this.startCardGeneration}>
          Start Timer
        </button>

        <button id="start-generation-btn" onClick={this.getCard}>
          Get Single Card
        </button>
      </div>
    );
  }
}

export default Cards;
