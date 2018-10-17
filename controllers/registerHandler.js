const registerHandler = (db, bcrypt) => (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json('invalid input')
    }
    //transcation
    db.transaction(trx => {
        trx('logins')
            .insert({
                email,
                password: bcrypt.hashSync(password)
            })
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .returning('*')
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(() => res.status(400).json('register faied for interval reason'))
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(() => res.status(400).json("can't register new user"))
};

module.exports = registerHandler;