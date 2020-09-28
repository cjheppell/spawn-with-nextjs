const db = require('../../../lib/db')
const escape = require('sql-template-strings')

module.exports = async (req, res) => {
  try{
    const [profile] = await db.query(escape`
      SELECT *
      FROM profiles
      WHERE id = ${req.query.id}
    `)
    res.status(200).json({ profile })
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}