import express from 'express';
import { LECTURES } from '../data/lectures.js';

const router = express.Router();

router.get('/', (req, res) => {
  const { q, role } = req.query;
  let results = LECTURES;

  if (role && role !== '전체') {
    results = results.filter(l => l.role === role);
  }

  if (q) {
    const lowerQ = q.toLowerCase();
    results = results.filter(l => 
      l.title.toLowerCase().includes(lowerQ) || 
      l.tags.some(t => t.toLowerCase().includes(lowerQ))
    );
  }

  res.json(results);
});

router.get('/:id', (req, res) => {
  const lecture = LECTURES.find(l => l.id == req.params.id);
  if (!lecture) return res.status(404).json({ message: 'Lecture not found' });
  res.json(lecture);
});

export default router;
