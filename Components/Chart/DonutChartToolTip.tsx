import React from 'react';

function DonutChartTooltip({ data, mousePosition, total }) {
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
      <p>
        ${data.count} / {Math.round((data.count * 100) / total)}%
      </p>
    </div>
  );
}

export default DonutChartTooltip;
