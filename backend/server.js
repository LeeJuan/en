const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 도메인만 허용
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,  // 쿠키나 인증 헤더 허용
  optionsSuccessStatus: 200,
}));

const languagesRouter = require('./routes/languages');
const examplesRouter = require('./routes/examples');
const translationsRouter = require('./routes/translations');

app.use(express.json());

// 기존: app.use('/languages', languagesRouter);
// 변경: 아래와 같이 /api를 프리픽스로 추가

app.get('/api', (req, res) => {
  res.send('Hello from Express!!!!');
});
app.use('/api/languages', languagesRouter);
app.use('/api/examples', examplesRouter);
app.use('/api/translations', translationsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3001;

// app.get('/api', (req, res) => {
//   res.send('Hello from Express!');
// });

// app.listen(port, () => {
//   console.log(`Express server is running on port ${port}`);
// });
