'use strict';

figma.showUI(
  `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font: 12px system-ui, sans-serif; margin: 12px; }
    button { padding: 8px 12px; cursor: pointer; margin-bottom: 8px; }
    #status { color: #333; white-space: pre-wrap; font-size: 11px; }
  </style>
</head>
<body>
  <button id="go">Export & copy JSON</button>
  <div id="status"></div>
  <script>
    document.getElementById('go').onclick = function () {
      document.getElementById('status').textContent = 'Exporting…';
      parent.postMessage({ pluginMessage: { type: 'export' } }, '*');
    };
    window.onmessage = function (event) {
      var m = event.data.pluginMessage;
      if (!m) return;
      if (m.type === 'result') {
        document.getElementById('status').textContent = 'Copied. Paste into figma-variables.json in the repo root.';
        navigator.clipboard.writeText(m.json);
      }
      if (m.type === 'error') {
        document.getElementById('status').textContent = 'Error: ' + m.message;
      }
    };
  </script>
</body>
</html>`,
  { width: 400, height: 200 }
);

function hexFromRGB(c) {
  var r = Math.round(c.r * 255);
  var g = Math.round(c.g * 255);
  var b = Math.round(c.b * 255);
  return (
    '#' +
    [r, g, b]
      .map(function (x) {
        return x.toString(16).padStart(2, '0');
      })
      .join('')
      .toUpperCase()
  );
}

function serializeVariableValue(variable, modeId) {
  var raw =
    modeId != null && variable.valuesByMode[modeId] !== undefined
      ? variable.valuesByMode[modeId]
      : Object.values(variable.valuesByMode)[0];

  if (
    variable.resolvedType === 'COLOR' &&
    raw &&
    typeof raw === 'object' &&
    'r' in raw
  ) {
    return hexFromRGB(raw);
  }
  if (variable.resolvedType === 'FLOAT') return String(raw);
  if (variable.resolvedType === 'STRING') return raw;
  if (variable.resolvedType === 'BOOLEAN') return raw ? 'true' : 'false';
  if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') {
    var ref = figma.variables.getVariableById(raw.id);
    return ref ? 'VariableAlias(' + ref.name + ')' : 'VariableAlias(?)';
  }
  if (raw && typeof raw === 'object' && 'family' in raw && 'style' in raw) {
    var size = raw.fontSize != null ? raw.fontSize : raw.size;
    return (
      'Font(family: "' +
      raw.family +
      '", style: ' +
      raw.style +
      ', size: ' +
      size +
      ')'
    );
  }
  try {
    return JSON.stringify(raw);
  } catch (e) {
    return String(raw);
  }
}

figma.ui.onmessage = function (msg) {
  if (msg.type !== 'export') return;

  if (!figma.variables) {
    figma.ui.postMessage({
      type: 'error',
      message: 'Variables API is not available for this file.',
    });
    return;
  }

  try {
    var out = {};
    var collections = figma.variables.getLocalVariableCollections();

    for (var i = 0; i < collections.length; i++) {
      var coll = collections[i];
      var modeId = coll.modes && coll.modes[0] ? coll.modes[0].modeId : null;
      var ids = coll.variableIds || [];
      for (var j = 0; j < ids.length; j++) {
        var variable = figma.variables.getVariableById(ids[j]);
        if (!variable) continue;
        var name = variable.name;
        if (name.charAt(0) === '_') continue;
        out[name] = serializeVariableValue(variable, modeId);
      }
    }

    var text = JSON.stringify(out, null, 2) + '\n';
    figma.ui.postMessage({ type: 'result', json: text });
  } catch (e) {
    figma.ui.postMessage({
      type: 'error',
      message: e && e.message ? e.message : String(e),
    });
  }
};
