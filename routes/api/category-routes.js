const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catagoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catagoryData = await Category.findByPk(req.params.id, {
      // not sure must test
      include: [{ model: Product}]
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No catagories found with this id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const catagoryData = await Category.create({
      catagory_id: req.body.catagory_id,
    });
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const catagoryData = await Category.update({
      Catagory_id: req.body.catagory_id,
    });
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catagoryData = await Category.destroy({
      where: {
       Catagory_id: req.params.id,
      },
    });

    if (!catagoryData) {
      res.status(404).json({ message: 'No Catagories found with that id!' });
      return;
    }

    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
