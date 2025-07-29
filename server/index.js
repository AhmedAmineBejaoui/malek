const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'password',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'stb',
  options: {
    trustServerCertificate: true
  }
};

mssql.connect(config).then(pool => {
  if (pool.connected) {
    console.log('Connected to SQL Server');
  }
}).catch(err => console.error('DB Connection Failed', err));

app.get('/api/users', async (req, res) => {
  try {
    const result = await mssql.query('SELECT id, username, userfirstname, email, mobile, role FROM users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  const { username, userfirstname, email, mobile, password, role } = req.body;
  try {
    const request = new mssql.Request();
    request.input('username', mssql.NVarChar(100), username);
    request.input('userfirstname', mssql.NVarChar(100), userfirstname);
    request.input('email', mssql.NVarChar(100), email);
    request.input('mobile', mssql.VarChar(30), mobile);
    request.input('password', mssql.NVarChar(200), password);
    request.input('role', mssql.NVarChar(50), role || 'User');
    await request.query(`INSERT INTO users (username, userfirstname, email, mobile, password, role) VALUES (@username,@userfirstname,@email,@mobile,@password,@role)`);
    res.json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const request = new mssql.Request();
    request.input('email', mssql.NVarChar(100), email);
    request.input('password', mssql.NVarChar(200), password);
    const result = await request.query('SELECT * FROM users WHERE email=@email AND password=@password');
    if (result.recordset.length) {
      res.json({ token: 'fake-token', user: result.recordset[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/demandes', async (req, res) => {
  const { request_type, request_sub_type, description, status, user_id } = req.body;
  try {
    const request = new mssql.Request();
    request.input('request_type', mssql.NVarChar(100), request_type);
    request.input('request_sub_type', mssql.NVarChar(100), request_sub_type);
    request.input('description', mssql.NVarChar(mssql.MAX), description);
    request.input('status', mssql.NVarChar(50), status || 'En attente');
    request.input('user_id', mssql.Int, user_id);
    await request.query(`INSERT INTO demandes (request_type, request_sub_type, description, status, user_id) VALUES (@request_type,@request_sub_type,@description,@status,@user_id)`);
    res.json({ message: 'Demande created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/demandes', async (req, res) => {
  try {
    const result = await mssql.query('SELECT * FROM demandes');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
