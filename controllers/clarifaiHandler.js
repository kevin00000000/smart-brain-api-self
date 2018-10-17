const clarifaiApi = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'd66335f02f7e41d885dafa12bbf5867f'
})

const clarifaiHandler = () => (req, res) => {
    const {url} = req.body;
    if(!url){
        return res.json('wrong param')
    }
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, url)
        .then(data => {res.json(data);})
        .catch(err => res.status(400).json(err))
}

module.exports = clarifaiHandler;