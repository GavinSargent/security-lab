const bcrypt = require('bcryptjs')



const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          let realPwd = bcrypt.compareSync(password, users[i].pwdHash)
          if(realPwd){
            let userObj = users[i]
            delete userObj.pwdHash
            console.log(userObj)
            return res.status(200).send(userObj)
          }          
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        
        const {password} = req.body
        
        const salt = bcrypt.genSaltSync(5)
        const pwdHash = bcrypt.hashSync(password, salt)

        let newUser = {...req.body, pwdHash: pwdHash}
        delete newUser.password
        // console.log(newUser)
        
        users.push(newUser)
        // console.log(users)
        res.status(200).send(req.body)
        
    }
}