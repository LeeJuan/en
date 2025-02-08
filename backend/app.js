const express = require('express');
const app = express();

const languagesRouter = require('./routes/languages');
const examplesRouter = require('./routes/examples');
const translationsRouter = require('./routes/translations');

app.use(express.json());

// 각 엔드포인트를 등록 (예: /languages, /examples, /translations)
app.use('/languages', languagesRouter);
app.use('/examples', examplesRouter);
app.use('/translations', translationsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
