import React from 'react';

function DonutChartTooltip({ data, mousePosition }) {
  return (
    <div
      style={{
        position: 'absolute',
        marginLeft: mousePosition.x,
        marginTop: mousePosition.y + 20,
      }}
    >
      <p>{data.name}</p>
    </div>
  );
}

export default DonutChartTooltip;
