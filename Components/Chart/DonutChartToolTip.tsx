import React from 'react';

function DonutChartTooltip({ data, mousePosition }) {
  console.log(data);
  const toCapital = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const percentage = (count) => {
    const total = data.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
    return Math.round((count / total) * 100);
  };

  //console.log(percentage(data.count) + '%');
  return (
    <div
      style={{
        backgroundColor: 'var(--budget_wrapper_background_secondary)',
        color: 'var(--body_text',
        position: 'absolute',
        marginLeft: mousePosition.x,
        marginTop: mousePosition.y + 20,
        padding: '0.5em',
        borderRadius: '10px',
      }}
    >
      <p>{toCapital(data.name)}</p>
      <p>${data.count}</p>
    </div>
  );
}

export default DonutChartTooltip;
