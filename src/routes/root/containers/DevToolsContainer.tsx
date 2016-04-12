import * as React from 'react';

declare const DEVELOPMENT;
let DevTools = null;

if (DEVELOPMENT) {
  const { createDevTools } = require('redux-devtools');
  const { default: LogMonitor } = require('redux-devtools-log-monitor');
  const { default: DockMonitor } = require('redux-devtools-dock-monitor');

  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="H" changePositionKey="Q" defaultIsVisible={false}>
      <LogMonitor />
    </DockMonitor>
  );
}

export default DevTools;
