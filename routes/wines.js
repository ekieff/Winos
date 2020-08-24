const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', (req, res, next) => {
    db.wine.findAll({
    }).then((wine) => {
    res.render('./wine/wine', {wine: wine})
    }).catch((error) => {
    console.log(error)
    })
})

router.post('/', (req, res) =>{
    db.wineTasting.create({
        userId: req.body.userId,
        notes: req.body.notes,
        wineId: req.body.wineId
    })
    .then((wineTasting) => {
        console.log(wineTasting)
        res.redirect('/')
    }).catch((error) =>{
        console.log(error)
    })
})

router.delete('/:id', (req, res) =>{
    db.wineTastings.destroy({
        where: {id:req.body.wineTasting}
    }).then(() =>{
        res.redirect('/')
    }).catch((error) =>{
        console.log(error)
    })
})

router.get('/:id', (req, res) => {
    db.wine.findOne({
      where: { id: req.params.id },
      include: [db.wineTasting]
    })
    .then((wine) => {
      if (!wine) throw Error()
      console.log(wine.wineTasting)
      res.render('wine/show', { wine: wine, wineTasting: wine.wineTasting })
    })
    .catch((error) => {
      console.log(error)
    })
  })


module.exports = router;