import React, { useState } from 'react'
import './App.css';
import Month from './components/Month';
import InputWindow from './components/InputWindow';
import logo from './logo.svg';

function App() {
  const [date, setDate]=useState(new Date());
  const [EventData, SetEventData]=useState({title: "Нова подія", date: "", id: 0, new: true});

  function AddMonth(){
    setDate(new Date(date.getFullYear(), date.getMonth()+1))
  }

  function DedMonth(){
    setDate(new Date(date.getFullYear(), date.getMonth()-1))
  }

  function GetToday(){
    setDate(new Date())
  }

  function addEvent(e){
    let date = e.target.getAttribute('date');
    SetEventData({
      title: "Нова подія", 
      date: date,
      id: 0,
      new: true
    });
    
        document.querySelector('.NameInput').value="";
      document.querySelector('.DescriptionInput').value="";
        document.querySelector('.InputWindow').hidden=false;
  }

  function ClickOnEvent(e){
    e.stopPropagation();
    let date = e.target.getAttribute('date');
    let json = localStorage.getItem(date);
    let events = JSON.parse(json);
    let event = events.events[e.target.id];
    SetEventData({
      title: "Редагування", 
      name: event.name, 
      description: event.description, 
      date: date, 
      color: event.color,
      id: e.target.id,
      new: false
    });
    document.querySelector('.ColorInput').value=event.color;
    document.querySelector('.NameInput').value=event.name;
    document.querySelector('.DescriptionInput').value=event.description;
    document.querySelector('.InputWindow').hidden=false;
  }

  function Reload(){
    setDate(new Date(date));
  }

  return (
    <div className="App">

      <div className='Header'>
        <div className='Header-start'>
          <img src={logo} className="App-logo" alt="logo" />
          <div className='Header-title'>Календар</div>
        </div>
        <h1 className='Month'>{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h1>

        <div className='Control'>
          <button className='Today' onClick={GetToday}>Сьогодні</button>
          <div className='Arrows'>
            <button className='Left' onClick={DedMonth}>{'<'}</button>
            <button className='Right' onClick={AddMonth}>{'>'}</button>
          </div>
        </div>
      </div>

    <div className='Content'>
      <Month year={date.getFullYear()} month={date.getMonth()} 
                    ClickOnDay={addEvent}
                    ClickOnEvent={ClickOnEvent}/>
      <InputWindow title={EventData.title}  
                    date={EventData.date}
                    Eventid={EventData.id}
                    NewEvent={EventData.new}
                    Reload={Reload}
                    />
      
      </div>
      
    </div>
  );
}

export default App;
