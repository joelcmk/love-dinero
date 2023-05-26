import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

import * as shape from 'd3-shape';
import { transition } from 'd3-transition';
import { select } from 'd3-selection';
import { interpolate } from 'd3-interpolate';

import DonutChartToolTip from './DonutChartToolTip';

function Chart({ expenses }) {
  const svgRef = useRef(null);

  function total(expense) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].category === expense) {
        total += expenses[i].amount;
      }
    }
    return total;
  }

  function totalByCategory() {
    const home = total('home');
    const shopping = total('shopping');
    const food = total('food');
    const transportation = total('transportation');
    const utilities = total('utilities');
    const household = total('household');
    const other = total('other');

    return [
      { name: 'home', count: home, color: '#00B8D9' },
      { name: 'shopping', count: shopping, color: '#F8BB00' },
      { name: 'food', count: food, color: '#0989F8' },
      {
        name: 'transportation',
        count: transportation,
        color: '#46D7A8',
      },
      { name: 'utilities', count: utilities, color: '#FE8D00' },
      { name: 'household', count: household, color: '#A5A8F8' },
      { name: 'other', count: other, color: '#3ACB5F' },
    ];
  }

  function sumOfAllExpenses(expenses) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      total += expenses[i].amount;
    }
    return total;
  }

  const [selectedArc, setSelectedArc] = useState({});
  const [mousePosition, setMousePosition] = useState({});

  const data = totalByCategory();

  useEffect(() => {
    svgChart();
  }, [expenses]);

  function svgChart() {
    let svg = d3
      .select(svgRef.current)
      .append('svg')
      .attr('width', 100 * 2)
      .attr('height', 100 * 2)
      .attr('class', 'example3')
      .append('g');

    const translate = {
      x: 100,
      y: 100,
    };
    let arc = shape.arc().outerRadius(100).innerRadius(90);

    let pie = shape
      .pie()
      .sort(null)
      .value(function (d) {
        return d.count;
      });

    let circle = select('svg').append('g');

    let trans = transition().duration(1000);

    let g = svg
      .selectAll('example3')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');

    let path = g
      .attr('id', function (d, i) {
        return i;
      })
      .append('path')
      .on('mouseover', (d, i) => {
        let mousePosition = {
          x: d.layerX,
          y: d.layerY,
        };
        handleMouseOver(i.data, mousePosition);
      })
      .on('mouseout', () => {
        handleMouseOut();
      })
      .attr('d', arc)
      .attr('stroke', 'white')
      .attr('stroke-width', 0);

    if (true) {
      path
        .transition(trans)
        .attrTween('d', (d) => {
          let i = interpolate(d.startAngle, d.endAngle);

          return (t) => {
            d.endAngle = i(t);

            return arc(d);
          };
        })
        .style('fill', function (d, i) {
          return d.data.color;
        });
    }

    const handleMouseOut = () => {
      setSelectedArc({});
    };

    const handleMouseOver = (data, mousePosition) => {
      setMousePosition(mousePosition);
      setSelectedArc(data);
    };
  }

  return (
    <div
      className="pie3"
      style={{
        position: 'relative',
        width: '200px',
        margin: '0 auto',
      }}
      id="arc"
    >
      {Object.keys(selectedArc).length ? (
        <DonutChartToolTip
          data={selectedArc}
          mousePosition={mousePosition}
          total={sumOfAllExpenses(expenses)}
        />
      ) : null}
      <>
        <div className="Chart" style={{ width: '200px' }}>
          <svg className="chart-pie" ref={svgRef} viewBox="0 0 200 200"></svg>
        </div>
      </>
    </div>
  );
}

export default Chart;
