const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'posts'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname));

// Handle file upload
app.post('/upload', upload.single('picture'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  res.json({ message: 'File uploaded successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});