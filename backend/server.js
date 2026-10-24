const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let pipelineState = {
  build: { status: 'idle', duration: '0s' },
  test: { status: 'idle', duration: '0s' },
  docker: { status: 'idle', duration: '0s' },
  scan: { status: 'idle', vulnerabilities: { critical: 0, high: 0 } },
  deploy: { status: 'idle', duration: '0s' }
};

app.post('/api/pipeline/update', (req, res) => {
  const { stage, status, metadata } = req.body;
  if (pipelineState[stage]) {
    pipelineState[stage] = { ...pipelineState[stage], status, ...metadata };
    io.emit('pipeline_update', pipelineState);
  }
  res.status(200).json({ success: true, state: pipelineState });
});

app.get('/api/pipeline/status', (req, res) => {
  res.json(pipelineState);
});

app.get('/', (req, res) => res.send('Sample App Running!'));

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
