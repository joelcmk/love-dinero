import React from 'react';
import { number, shape, string } from 'prop-types';

function DonutChartTooltip(props) {
  const { count, name, mousePosition, pieClass, tooltipClass } = props;
  const donutChart = document.getElementsByClassName(pieClass);
  const container = donutChart.length && donutChart[0].getBoundingClientRect();
  const positionY = mousePosition.y - container.height;
  const positionX = mousePosition.x;
  const studentCount = `${name}: ${count}`;
  const tooltipStyle = tooltipClass || 'donut-tooltip';
  console.log(positionX);

  return (
    <div style={{ marginLeft: positionX, marginTop: positionY }}>
      {studentCount}
    </div>
  );
}

export default DonutChartTooltip;
