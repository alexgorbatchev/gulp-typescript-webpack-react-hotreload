import * as React from 'react';

const { createDevTools } = require('redux-devtools');
const { default: LogMonitor } = require('redux-devtools-log-monitor');
const { default: DockMonitor } = require('redux-devtools-dock-monitor');

export default createDevTools(
  <DockMonitor toggleVisibilityKey="H" changePositionKey="Q" defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);
