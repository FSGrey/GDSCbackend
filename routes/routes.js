const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', (req, res) => res.send("Working"))

router.get('/cards', async (req, res, next) => {
  try {
    const cards = await Card.find({})
    return res.status(200).json()
  } catch(err){
    next(err)
  }
})

router.post('/cards', async (req, res, next) => {
  const {content,category} = req.body
  if(!content || !category){
    res.status(401)
    return next(new Error("bad request body"))
  }
  try{
    const card = await Card.create({content,body})
    return res.status(200).json(card)
  } catch(err){
    next(err)
  }
})

router.put('/cards/:id', async (req, res, next) => {
  const {content, category} = req.body
  const {id} = req.params
  if(!content || !category){
    res.status(401)
    return next(new Error("bad request body"))
  }
  if(!id){
    res.status(401)
    return next(new Error("bad URL"))
  }
  try{
    await Card.findByIdAndUpdate({_id:id},{content,category})
    const card = Card.findOne({_id:id})
    return res.status(200).json(card)
  } catch(err){
    next(err)
  }
})

module.exports = router