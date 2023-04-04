import { React, useEffect } from 'react';
//import './Footer.css';
function Footer() {
  // var url = require('url');
  // var connection = new WebSocket(
  //   url.format({
  //     protocol: window.location.protocol === 'https:' ? 'wss' : 'ws',
  //     hostname: process.env.WDS_SOCKET_HOST || window.location.hostname,
  //     port: process.env.WDS_SOCKET_PORT || window.location.port,
  // Hardcoded in WebpackDevServer
  //   })
  // );
  // useEffect(() => {
  // Update the document title using the browser API
  //   connection.onclose = function () {
  //     if (
  //       typeof console !== 'undefined' &&
  //       typeof console.info === 'function'
  //     ) {
  //       console.info(
  //         'The development server has disconnected.\nRefresh the page if necessary.'
  //       );
  //     }
  //   };
  // });

  // connection.onclose = function () {
  //   if (typeof console !== 'undefined' && typeof console.info === 'function') {
  //     console.info('Thhkkhghggffsy.');
  //   }
  // };
  return <div className="footer"></div>;
}

export default Footer;
