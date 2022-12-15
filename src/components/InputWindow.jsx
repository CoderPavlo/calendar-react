import React from 'react'
import './InputWindow.css';

function InputWindow(props) {

    function cancel(e){
     e.target.parentElement.parentElement.hidden=true;
    }

    function save(e){
        let date = document.querySelector('.DateInput').value;

        let json = localStorage.getItem(date);
        let events = JSON.parse(json);
        
        let event = {
          name: document.querySelector('.NameInput').value,
          description: document.querySelector('.DescriptionInput').value,
          color: document.querySelector('.ColorInput').value
        }

      if(props.NewEvent){
        if(events===null)
            events = {
                events: []
            }
        events.events.push(event);
      }
      else{
        events.events[props.Eventid] = event;
      }
        localStorage.setItem(date, JSON.stringify(events));
        props.Reload();      
        cancel(e);
    }

    function deleteEvent(e){
      let date = document.querySelector('.DateInput').value;

      let json = localStorage.getItem(date);
      let events = JSON.parse(json);
    
      events.events.splice(props.Eventid, 1);
      
      localStorage.setItem(date, JSON.stringify(events));
      props.Reload();      
            cancel(e);

    }

  return (
    <div className='InputWindow' hidden>
          <div className='Title'>
            <h2>{props.title}</h2>
          </div>

          <input className="NameInput" type="text" placeholder="Додайте назву" autoFocus=""/>
          <textarea className="DescriptionInput" placeholder="Додайте опис" autoFocus="" rows={4} />

          <div className='containerDate'>
            <h4>Дата:</h4>
            <input className='DateInput' type="date" defaultValue={props.date} />
          </div>
          <div className='SelectColor'>
            <input type="color" className="ColorInput" />
            <label htmlFor="ColorInput">Колір</label>
          </div>

          <div className='container'>
            <button className='button' onClick={cancel}>Скасувати</button>
            <button className='button' onClick={deleteEvent} disabled={props.NewEvent}>Видалити</button>
            <button className='button' onClick={save}>Зберегти</button>
          </div>

    </div>
  );
}

export default InputWindow;