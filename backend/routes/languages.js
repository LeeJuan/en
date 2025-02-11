const express = require('express');
const router = express.Router();
const { Language, Example, Translation } = require('../models');

// GET /languages?page=1&limit=100
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const offset = (page - 1) * limit;
  try {
    const { count, rows } = await Language.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });
    res.json({
      data: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 단일 언어 조회 (예제와 번역 포함)
router.get('/:id', async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id, {
      include: [
        { model: Example },
        { model: Translation }
      ]
    });
    if (!language) return res.status(404).json({ error: 'Language not found' });
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 언어 추가 (CREATE) – 기본 단어 정보만 추가 (예제와 번역은 별도 API로 추가)
router.post('/', async (req, res) => {
  try {
    const { word } = req.body;
    const newLanguage = await Language.create({ word });
    console.log('Created record:', newLanguage.toJSON());

    res.status(201).json(newLanguage);
  } catch (error) {
    console.log('Created record:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 언어 수정 (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id);
    if (!language) return res.status(404).json({ error: 'Language not found' });
    await language.update({ word: req.body.word });
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 언어 삭제 (DELETE) – CASCADE 옵션으로 예제와 번역도 함께 삭제됨
router.delete('/:id', async (req, res) => {
  try {
    const language = await Language.findByPk(req.params.id);
    if (!language) return res.status(404).json({ error: 'Language not found' });
    await language.destroy();
    res.json({ message: 'Language deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
