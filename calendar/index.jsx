import React from 'react';
import './css/main.css';

const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const Calendar = (props) => {
  const data = [[], [], [], [], [], []];
  const currentMonthFirstDay = props.date.getDay();
  const today = props.date.getDate();

  if (currentMonthFirstDay - 1 > 0) {
    const prevMonthDays = new Date(props.date.getFullYear(), props.date.getMonth(), 0).getDate();

    for (let i = 0; i < (currentMonthFirstDay - 1); i++) {
      data[0].push({ date: prevMonthDays - i, isOther: true });
    }
  }

  let currentWeek = 0;
  const currentMonthDays = new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0).getDate();

  for (let i = 1; i < currentMonthDays + 1; i++) {
    if (data[currentWeek].length === 7) {
      currentWeek += 1;
    }
    data[currentWeek].push({ date: i });
  }

  if (data[currentWeek].length < 7) {
    const daysOfNewMonth = 7 - data[currentWeek].length;

    for (let i = 1; i < daysOfNewMonth + 1; i++) {
      data[currentWeek].push({ date: i, isOther: true });
    }
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{daysOfWeek[props.date.getDay() - 1]}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{today}</div>
          <div className="ui-datepicker-material-month">{months[props.date.getMonth()]}</div>
          <div className="ui-datepicker-material-year">{props.date.getFullYear()}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{months[props.date.getMonth()]}</span>&nbsp;
          <span className="ui-datepicker-year">{props.date.getFullYear()}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
        <tr>
          <th scope="col" title="Понедельник">Пн</th>
          <th scope="col" title="Вторник">Вт</th>
          <th scope="col" title="Среда">Ср</th>
          <th scope="col" title="Четверг">Чт</th>
          <th scope="col" title="Пятница">Пт</th>
          <th scope="col" title="Суббота">Сб</th>
          <th scope="col" title="Воскресенье">Вс</th>
        </tr>
        </thead>
        <tbody>
        {data.map((week, weekIndex) => {
          if (week.length) {
            return (
              <tr key={`week-${weekIndex}`}>
                {week.map((day, dayIndex) => {
                  let className = '';

                  if (day.isOther) {
                    className += "ui-datepicker-other-month";
                  }
                  if (day.date === today) {
                    className += 'ui-datepicker-today'
                  }

                  return (
                    <td
                      key={`week-${weekIndex}-day-${dayIndex}`}
                      className={className}
                    >
                      {day.date}
                    </td>
                  );
                })}
              </tr>
            );
          }
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
