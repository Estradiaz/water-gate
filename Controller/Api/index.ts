import express from 'express';

const api = express();
api.use(express.urlencoded({extended: true}));
api.use(express.json())

api.put('/device/:device', (req, res) => {

    const device = req.params.device
    res.send('put device')
})

export default api;