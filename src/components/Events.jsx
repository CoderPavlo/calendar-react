import React from 'react'
import './Events.css';

function Events(props) {

        let json = localStorage.getItem(props.date);
        let events = JSON.parse(json);
        
        if(events===null)
            events = {
                events: []
            }
            let index = 0;
  return (
    <div className='Events'>
        {events.events.map(item => (
            <div className='Event' style={{backgroundColor: item.color}} date={props.date} id={index} key={index++} onClick={props.ClickOnEvent}>
              {item.name}
            </div>
        ))}
        
    </div>
  );
}

export default Events;