const express = require('express');
const app = express();
const NodeMediaServer = require('node-media-server');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        mediaroot: './media',
        allow_origin: '*'
    },
    trans: {
        ffmpeg: 'C:/fFmpeg/ffmpeg.exe',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
            }
        ]
    }    
};

const nms = new NodeMediaServer(config);
nms.run();

const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});