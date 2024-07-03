const express = require('express');      //importing express library
const app = express();                   //initializing app instance of express
const PORT = 3000;                       //assigning the port to listen on

// Middleware to handle JSON requests
app.use(express.json());

// In-memory data store
let items = [];

// Create Operation: Add a new item
app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,           //generate unique ID by adding 1 to array length
    ...req.body                     //spread operator to copy everything from request body
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read Operation: Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Read Operation: Get a single item by id
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Update Operation: Update an item by id
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  Object.assign(item, req.body);
  res.json(item);
});

// Delete Operation: Delete an item by id
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  res.status(204).end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
