const signinHandler = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('invalid input')
    }
    db.select('email', 'password').from('logins').where({email})
        .then(data => {
            if (!data.length){
                return res.status(400).json('invalid email')
            }
            const isMatch = bcrypt.compareSync(password, data[0].password)
            if(isMatch){
                db.select('*').from('users').where({email})
                    .then(data => {
                        res.json(data[0])
                    })
                    .catch(() => res.status(400).json('unable to get user'))
            }else{
                res.status(400).json('invalid password')
            }
        })
        .catch(() => res.status(400).json('unable to get login'))
}

module.exports = signinHandler;