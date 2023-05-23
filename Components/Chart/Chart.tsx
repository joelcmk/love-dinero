import React, { useState, useEffect, useRef, use } from 'react';
import * as d3 from 'd3';
import exp from 'constants';
import { off } from 'process';

import * as shape from 'd3-shape';
import { transition } from 'd3-transition';
import { select, event } from 'd3-selection';
import { interpolate } from 'd3-interpolate';

import DonutChartToolTip from './DonutChartToolTip';

function Chart({ expenses }) {
  //   const [isLoading, setIsLoading] = useState(true);

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

  //   function test(data) {
  //     // retrieve the svg in which to plot the viz
  //     const svg = d3.select(svgRef.current);

  //     const sumOfAllExpenses = data.reduce((acc, curr) => acc + curr.amount, 0);

  //     // identify the dimensions of the viewBox to establish the svg canvas
  //     const viewBox = [0, 0, 500, 250].join(' '); // [0, 0, 500, 250] is the default];
  //     //svg.attr('viewBox');

  //     const regexViewBox = /\d+ \d+ (\d+) (\d+)/;
  //     // ! .match() returns string values
  //     const [, viewBoxWidth, viewBoxHeight] = viewBox
  //       .match(regexViewBox)
  //       .map((item) => Number.parseInt(item, 10));
  //     // with the margin convention include a group element translated within the svg canvas
  //     const margin = {
  //       top: 20,
  //       right: 10,
  //       bottom: 20,
  //       left: 10,
  //     };
  //     // compute the width and height of the actual viz from the viewBox dimensions and considering the margins
  //     // this to later work with width and height attributes directly through the width and height variables
  //     const width = viewBoxWidth - (margin.left + margin.right);
  //     const height = viewBoxHeight - (margin.top + margin.bottom);

  //     // compute the radius as half the minor size between the width and height
  //     const radius = Math.min(width, height) / 2;
  //     // initialize a variable to have the multiple elements share the same stroke-width property
  //     const strokeWidth = 10;

  //     const group = svg
  //       .append('g')
  //       .attr('transform', `translate(${margin.left} ${margin.top})`);

  //     // DEFAULT CIRCLE
  //     // circle used as a background for the colored donut chart
  //     // add a group to center the circle in the canvas (this to rotate the circle from the center)
  //     const groupDefault = group
  //       .append('g')
  //       .attr('transform', `translate(${width / 2} ${height / 2})`);

  //     // append the circle showing only the stroke
  //     groupDefault
  //       .append('circle')
  //       .attr('cx', 0)
  //       .attr('cy', 0)
  //       .attr('r', radius)
  //       .attr('transform', 'rotate(-90)')
  //       .attr('fill', 'none')
  //       .attr('stroke', 'hsla(0, 0%, 0%, 0.08')
  //       .attr('stroke-width', strokeWidth)
  //       .attr('stroke-linecap', 'round')
  //       // hide the stroke of the circle using the radius
  //       // this to compute the circumference of the shape
  //       .attr('stroke-dasharray', radius * 3.14 * 2)
  //       .attr('stroke-dashoffset', radius * 3.14 * 2);

  //     // COLORED CIRCLES
  //     // pie function to compute the arcs
  //     const pie = d3
  //       .pie()
  //       .sort(null)
  //       .padAngle(0.12)
  //       // use either the value or the percentage in the dataset
  //       .value((d) => d.amount);

  //     // arc function to create the d attributes for the path elements
  //     const arc = d3
  //       .arc()
  //       // have the arc overlaid on top of the stroke of the circle
  //       .innerRadius(radius)
  //       .outerRadius(radius);

  //     /* for each data point include the following structure
  // g             // wrapping all arcs
  //   g           // wrapping each arc
  //     arc       // actual shape
  //     line      // connecting line
  //     text      // text label
  //   g
  //     arc
  //     ...
  // */
  //     // wrapping group, horizontally centered
  //     const groupArcs = group
  //       .append('g')
  //       .attr('transform', `translate(${width / 2} ${height / 2})`);

  //     const groupsArcs = groupArcs
  //       .selectAll('g')
  //       .data(pie(data))
  //       .enter()
  //       .append('g');

  //     // include the arcs specifying the stroke with the same width of the circle element
  //     groupsArcs
  //       .append('path')
  //       .attr('d', arc)
  //       .attr('fill', 'none')
  //       .attr('stroke', (d) => d.data.color)
  //       .attr('stroke-width', strokeWidth * 1)
  //       .attr('stroke-linecap', 'round')
  //       .attr('stroke-linejoin', 'round')
  //       // hide the segments by applying a stroke-dasharray/stroke-dashoffset equal to the circle circumference
  //       // ! the length of the element varies, and it considered afterwords
  //       // for certain the paths are less than the circumference of the entire circle
  //       .attr('stroke-dasharray', radius * 3.14 * 2)
  //       .attr('stroke-dashoffset', radius * 3.14 * 2);

  //     // include line elements visually connecting the text labels with the arcs
  //     groupsArcs
  //       .append('line')
  //       .attr('x1', 0)
  //       .attr('x2', (d) => {
  //         const [x] = arc.centroid(d);
  //         return x > 0 ? '25' : '-25';
  //       })
  //       .attr('y1', 0)
  //       .attr('y2', 0)
  //       .attr('stroke', ({ data: d }) => {
  //         d.color;
  //       })
  //       .attr('stroke-width', 3)
  //       .attr('transform', (d) => {
  //         const [x, y] = arc.centroid(d);
  //         const offset = x > 0 ? 20 : -20;
  //         return `translate(${x + offset} ${y})`;
  //       })
  //       .attr('stroke-dasharray', 25)
  //       .attr('stroke-dashoffset', 25);

  //     // include text elements associated with the arcs
  //     groupsArcs

  //       .append('text')
  //       .attr('x', 0)
  //       .attr('y', 0)
  //       .attr('font-size', 15)
  //       .attr('text-anchor', (d) => {
  //         const [x] = arc.centroid(d);
  //         return x > 0 ? 'start' : 'end';
  //       })
  //       .attr('transform', (d) => {
  //         const [x, y] = arc.centroid(d);
  //         console.log(x, y);
  //         const offset = x > 0 ? 50 : -50;
  //         return `translate(${x + offset} ${y})`;
  //       })
  //       .html(
  //         ({ data: d }) => `
  //     <tspan x="0" font-weight="bold">${
  //       d.category
  //     }:</tspan><tspan x="0" dy="18">${Math.round(
  //           (d.amount * 100) / sumOfAllExpenses
  //         )}% / $${d.amount}</tspan>
  //   `
  //       )
  //       .style('opacity', 0)
  //       .style('visibility', 'hidden');

  //     // TRANSITIONS
  //     // once the elements are set up
  //     // draw the stroke of the larger circle element
  //     groupDefault
  //       .select('circle')
  //       .transition()
  //       .ease(d3.easeExp)
  //       .delay(200)
  //       .duration(2000)
  //       .attr('stroke-dashoffset', '0')
  //       // once the transition is complete
  //       // draw the smaller strokes one after the other
  //       .on('end', () => {
  //         // immediately set the stroke-dasharray and stroke-dashoffset properties to match the length of the path elements
  //         // using vanilla JavaScript
  //         const paths = document.querySelectorAll('svg g g path');
  //         paths.forEach((path) => {
  //           const length = path.getTotalLength();
  //           path.setAttribute('stroke-dasharray', length);
  //           path.setAttribute('stroke-dashoffset', length);
  //         });

  //         const duration = 1000;
  //         // transition the path elements to stroke-dashoffset 0
  //         d3.selectAll('svg g g path')
  //           .transition()
  //           .ease(d3.easeLinear)
  //           .delay((d, i) => i * duration)
  //           .duration(duration)
  //           .attr('stroke-dashoffset', 0);

  //         // transition the line elements elements to stroke-dashoffset 0
  //         d3.selectAll('svg g g line')
  //           .transition()
  //           .ease(d3.easeLinear)
  //           .delay((d, i) => i * duration + duration / 2.5)
  //           .duration(duration / 3)
  //           .attr('stroke-dashoffset', 0);

  //         // transition the text elements to opacity 1 and visibility visible
  //         d3.selectAll('svg g g text')
  //           .transition()
  //           .ease(d3.easeLinear)
  //           .delay((d, i) => i * duration + duration / 2)
  //           .duration(duration / 2)
  //           .style('opacity', 1)
  //           .style('visibility', 'visible');
  //       });
  //   }

  //   function buttonTest() {
  //     console.log();
  //   }

  const [selectedArc, setSelectedArc] = useState({});
  const [mousePosition, setMousePosition] = useState({});

  const [circle, setCircle] = useState(null);
  const [g, setG] = useState(null);
  const [pie, setPie] = useState(false);
  const [svg, setSvg] = useState(null);
  const [arc, setArc] = useState(() =>
    shape.arc().outerRadius(100).innerRadius(90)
  );
  const [path, setPath] = useState(null);
  const [trans, setTrans] = useState(null);

  // let data = [
  //   { name: 'Catch tail', count: 10, color: '#00A99D' },
  //   { name: 'Smell own butt', count: 20, color: '#E89F74' },
  //   { name: "Drool over hooman's food", count: 30, color: '#DA5B41' },
  //   { name: 'Play with hooman', count: 40, color: '#9AA4AF' },
  // ];

  console.log('dkdk');

  const data = totalByCategory();

  useEffect(() => {
    test();
  }, []);

  useEffect(() => {
    if (circle) {
      update();
    }
  }, [expenses]);

  console.log(circle);

  function test() {
    let svg = select('.pie3')
      .append('svg')
      .attr('width', 100 * 2)
      .attr('height', 100 * 2)
      .attr('class', 'example3')
      .append('g');

    //     //svg.attr('viewBox');

    //     const regexViewBox = /\d+ \d+ (\d+) (\d+)/;
    //     // ! .match() returns string values
    //     const [, viewBoxWidth, viewBoxHeight] = viewBox
    //       .match(regexViewBox)
    //       .map((item) => Number.parseInt(item, 10));
    //     // with the margin convention include a group element translated within the svg canvas
    //     const margin = {
    //       top: 20,
    //       right: 10,
    //       bottom: 20,
    //       left: 10,
    //     };

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

    // TODO: Implement an option to display text at the center of the pie chart
    // if (this.props.displayCenterText) {
    //   circle
    //     .append('svg:circle')
    //     .attr('stroke', 'white')
    //     .attr('fill', '#132434')
    //     .attr('r', this.props.innerRadius)
    //     .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');

    //   circle
    //     .append('text')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', this.props.outerRadius / 2)
    //     .attr('y', 0)
    //     .attr('id', 'total-count')
    //     .text(totalCount)
    //     .style('fill', 'white')
    //     .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');

    //   circle
    //     .append('text')
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', this.props.outerRadius)
    //     .attr('y', 20)
    //     .text(this.props.centerText)
    //     .style('fill', 'white')
    //     .attr('transform', 'translate(' + translate.x + ',' + translate.y + ')');
    // }

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
    //   this.setState(
    //     {
    //       g,
    //       pie,
    //       svg,
    //       arc,
    //       path,
    //       trans,
    //       circle
    //     },
    //     this.update
    //   );

    setG(g);
    setPie(pie);
    setSvg(svg);
    setArc(arc);
    setPath(path);
    setCircle(circle);

    //const [g, setG] = useState();
    // const [pie, setPie] = useState();
    // const [svg, setSvg] = useState();
    // const [arc, setArc] = useState();
    // const [path, setPath] = useState();

    // componentDidUpdate(nextProps) {
    //   if (this.props !== nextProps) {
    //     this.update();
    //   }
    // }
    //console.log(g.select('path').interrupt());

    const handleMouseOut = () => {
      setSelectedArc({});
    };

    const handleMouseOver = (data, mousePosition) => {
      //console.log(data);
      setMousePosition(mousePosition);
      setSelectedArc(data);
    };
  }

  const update = () => {
    let totalCount = 0;
    let donutData = totalByCategory();

    donutData.forEach((data) => (totalCount += data.count));
    let data =
      donutData &&
      donutData.map((donutChartData) => {
        let percentage = (donutData.count * 100) / totalCount || 0;

        return { ...donutChartData, percentage };
      });

    if (transition) {
      g.select('path')
        .interrupt()
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
    } else {
      g.select('path').style('fill', function (d, i) {
        return d.data.color;
      });
    }
  };

  //console.log(Object.keys(selectedArc).length);

  return (
    <div
      className="pie3"
      ref={svgRef}
      style={{
        position: 'relative',
      }}
      id="arc"
    >
      {Object.keys(selectedArc)?.length ? (
        <DonutChartToolTip
          pieClass="pie3"
          tooltipClass={'donut-tooltip'}
          name={selectedArc.name || ''}
          count={selectedArc.count || ''}
          mousePosition={mousePosition}
        />
      ) : null}
    </div>
  );
}

//   return (
//     <>
//       <div className="Chart">
//         <svg className="chart-pie" ref={svgRef} viewBox="-10 0 500 250"></svg>
//       </div>
//       <button onClick={buttonTest}>test</button>
//     </>
//   );
// }

export default Chart;
