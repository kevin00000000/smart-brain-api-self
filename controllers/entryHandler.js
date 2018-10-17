const entryHandler = (db) => (req, res) => {
    const {id} = req.body;
    if (!id){
        return res.status(400).json('wrong param')
    }
    db('users').update('entries').where('id', '=', id).increment('entries', 1).returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(() => {res.status(400).json('update entries failed')})
}

module.exports = entryHandler;