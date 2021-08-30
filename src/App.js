import React, { useEffect, useState } from "react";
import "./App.css";
import "./reset.css";

const bankOne = [
  {
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const DrumPad = (props) => {
  const { keyTrigger, id, url } = props.pad
  const { key, count } = props.keyTapped
  const { setDisplay, options } = props
  
  useEffect(() => {
    if(key === keyTrigger) {
      document.getElementById(keyTrigger).click()
    }
  },[count])

  useEffect(() => {
    const volume = options.volume / 10
    document.getElementById(keyTrigger).volume = volume
  }, [options])

  const playAudio = () => {
    document.getElementById(keyTrigger).currentTime = 0
    document.getElementById(keyTrigger).play()
    setDisplay(id)
  }

  const handleClick = () => {
    playAudio()
  }
  return (
    <div className="drum-pad" id={id} onClick={handleClick}>
      <audio class="clip" id={keyTrigger} src={url}></audio>
      { keyTrigger }
    </div>
  );
};

const App = () => {
  const [display, setDisplay] = useState('')
  const [pads, setPads] = useState(bankOne)
  const [keyTapped, setKeyTapped] = useState({
    key: '',
    count: 0
  })
  const [options, setOptions] = useState({ volume: 10 })

  const onKey = ({ key }) => {
    const upperKey = key.toUpperCase();
    setKeyTapped({...keyTapped, key: upperKey, count: keyTapped.count+1})
  };

  return (
    <div
      id="drum-machine"
      className="wrapper"
      onKeyDown={(e) => onKey(e)}
      tabIndex="0"
    >
      <p id="display">{display}</p>
      <div className="drum">
        { pads.map(pad => {
          return <DrumPad pad={pad} keyTapped={keyTapped} setDisplay={setDisplay} options={options} />
        }) }
      </div>
      <form className="options">
        <input type="range" name="volume" min="0" max="10" value={options.volume} onChange={(e) => setOptions({ ...options, volume: e.target.value })} />
      </form>
    </div>
  );
};

export default App;
