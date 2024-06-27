import React, { Component } from 'react';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date().toLocaleTimeString(),
    };
  }

  // Lifecycle method: componentDidMount
  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 1000);
  }

  // Lifecycle method: componentWillUnmount
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  updateTime() {
    this.setState({
      currentTime: new Date().toLocaleTimeString(),
    });
  }

  render() {
    const timeStyles = {
      textAlign: 'center', // Posisi teks di tengah
      fontSize: '3rem',    // Ukuran teks besar
      fontWeight: 'bold', 
      fontColor:'black' // Teks tebal
    };

    return (
      <>
       
        <p style={timeStyles}>{this.state.currentTime}</p>
      </>
    );
  }
}

export default Time;
