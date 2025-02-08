const express = require('express');
const router = express.Router();
const { Translation } = require('../models');

// 번역 추가 (CREATE)
// 요청 본문: { language_id, example_id, language_code, mean, example_mean }
router.post('/', async (req, res) => {
  try {
    const { language_id, example_id, language_code, mean, example_mean } = req.body;
    const newTranslation = await Translation.create({ language_id, example_id, language_code, mean, example_mean });
    res.status(201).json(newTranslation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 전체 번역 조회 (READ)
router.get('/', async (req, res) => {
  try {
    const translations = await Translation.findAll();
    res.json(translations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 단일 번역 조회 (READ)
router.get('/:id', async (req, res) => {
  try {
    const translation = await Translation.findByPk(req.params.id);
    if (!translation) return res.status(404).json({ error: 'Translation not found' });
    res.json(translation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 번역 수정 (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const translation = await Translation.findByPk(req.params.id);
    if (!translation) return res.status(404).json({ error: 'Translation not found' });
    const { language_code, mean, example_mean } = req.body;
    await translation.update({ language_code, mean, example_mean });
    res.json(translation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 번역 삭제 (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const translation = await Translation.findByPk(req.params.id);
    if (!translation) return res.status(404).json({ error: 'Translation not found' });
    await translation.destroy();
    res.json({ message: 'Translation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
