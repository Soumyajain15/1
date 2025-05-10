const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { fromBuffer } = require('file-type');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

const PORT = process.env.PORT || 3001;

function isPrime(n) {
  const num = parseInt(n);
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', async (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = data.filter(i => !isNaN(i));
  const alphabets = data.filter(i => /^[a-zA-Z]$/.test(i));
  const lowercases = alphabets.filter(ch => ch === ch.toLowerCase());
  const highest_lowercase_alphabet = lowercases.length ? [lowercases.sort().reverse()[0]] : [];
  const is_prime_found = numbers.some(num => isPrime(num));

  let file_valid = false, file_mime_type = null, file_size_kb = null;
  if (file_b64) {
    try {
      const buffer = Buffer.from(file_b64, 'base64');
      const fileType = await fromBuffer(buffer);
      if (fileType) {
        file_valid = true;
        file_mime_type = fileType.mime;
        file_size_kb = (buffer.length / 1024).toFixed(2);
      }
    } catch (e) {
      console.error('File error:', e);
    }
  }

  res.json({
    is_success: true,
    user_id: "your_name_01012000",
    email: "your_email@college.com",
    roll_number: "ROLL123",
    numbers,
    alphabets,
    highest_lowercase_alphabet,
    is_prime_found,
    file_valid,
    file_mime_type,
    file_size_kb
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
