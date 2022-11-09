const handleSignin = (db, bcrypt)=>(req, res) => {
 /* if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }*/
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(404).json("unable to get users"));
      } else {
        res.status(404).json("Wrong Credintenls");
      }
    });
};

module.exports = {
  handleSignin: handleSignin
}