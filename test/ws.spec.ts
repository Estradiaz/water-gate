import {describe, test} from 'mocha'
import WS from 'ws';

describe(
    'test websocket server handling',
    () => {
        test(
            'ws should connect to port 3001 wsServer', 
            () => {

                return new Promise((resolve, reject) => {

                    const ws = new WS('ws://localhost:3001');
                    ws.on('open', resolve)
                    ws.on('error', reject);
                })

            }

        ).timeout(2000)
    }
)