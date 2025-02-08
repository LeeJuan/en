const express = require('express');
const router = express.Router();
const { Example } = require('../models');

// 예제 추가 (CREATE)
router.post('/', async (req, res) => {
  try {
    // 요청 본문: { language_id, example, example_sound }
    const { language_id, example, example_sound } = req.body;
    const newExample = await Example.create({ language_id, example, example_sound });
    res.status(201).json(newExample);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 전체 예제 조회 (READ)
router.get('/', async (req, res) => {
  try {
    const examples = await Example.findAll();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 단일 예제 조회 (READ)
router.get('/:id', async (req, res) => {
  try {
    const example = await Example.findByPk(req.params.id);
    if (!example) return res.status(404).json({ error: 'Example not found' });
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 예제 수정 (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const example = await Example.findByPk(req.params.id);
    if (!example) return res.status(404).json({ error: 'Example not found' });
    await example.update({ example: req.body.example, example_sound: req.body.example_sound });
    res.json(example);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 예제 삭제 (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const example = await Example.findByPk(req.params.id);
    if (!example) return res.status(404).json({ error: 'Example not found' });
    await example.destroy();
    res.json({ message: 'Example deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
