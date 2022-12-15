import React from 'react'
import './Month.css';
import Events from './Events';

import moment from 'moment';


function Month(props) {
  const days = [
    { id: 1, day: "Понеділок" },
    { id: 2, day: "Вівторок" },
    { id: 3, day: "Середа" },
    { id: 4, day: "Четвер" },
    { id: 5, day: "П'ятниця" },
    { id: 6, day: "Субота" },
    { id: 7, day: "Неділя" }
  ];

  function GetWeek(StartDate){
    let week = [];

    for (let i = 1; i <= 7; i++){
    
      const dateOfDay = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate() + i - 1);
      let color= 'gray';
      let backColor='transparent';
      if(props.month===dateOfDay.getMonth()) color='black';
      let Today = new Date();
      let IsToday = (
        Today.getFullYear() === dateOfDay.getFullYear() &&
        Today.getMonth() === dateOfDay.getMonth() &&
        Today.getDate() === dateOfDay.getDate());
      if(IsToday) backColor='aliceblue';
      let day={
        id: i,
        date: dateOfDay,
        textColor: color,
        background: backColor
      };
      week.push(day);
    }
    return week;
  }

  function GetMonth(){
    let firstDayOfMonth = new Date(props.year, props.month, 1);
    let dayOfWeek=firstDayOfMonth.getDay();
    if(dayOfWeek===0) 
      dayOfWeek = 7;
  
    let startDayOfFirstWeek=new Date(props.year, props.month, firstDayOfMonth.getDate()-dayOfWeek + 1);
    let Fullmonth=[]
    for(let i=1; i<=6; i++){
      let startDay = new Date(startDayOfFirstWeek.getFullYear(), startDayOfFirstWeek.getMonth(), startDayOfFirstWeek.getDate() + (i - 1)*7);
      let week = {
        id: i,
        week: GetWeek(startDay)
      };
      Fullmonth.push(week);
    }
    return Fullmonth;
  }

  const Fullmonth = GetMonth();

  return (
    <table className='Table'>
        <thead>
          <tr>
            {days.map(item => (
              <th key={item.id} className='Head'>{item.day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Fullmonth.map(item => (
              <tr key={item.id} className='Row'>
                
                {item.week.map(week => (
                  <td key={week.id} className='Cell' date={moment(week.date).format('YYYY-MM-DD')} style={{background: week.background}} onClick={props.ClickOnDay}>                 
                    <div className='HeadOfCell' style={{color: week.textColor}}>
                      {week.date.getDate()}
                    </div>
                    <Events date={moment(week.date).format('YYYY-MM-DD')} ClickOnEvent={props.ClickOnEvent}/>
                  </td>
                ))}
                
              </tr>
            ))}
        </tbody>
      </table>
  );
}

export default Month;