exports.getFile = async (req, res) => {
  const fileId = req.params.id;
  const size = req.query.size || 500;  // Default size is 500
  const userId = req.headers['x-token'];  // Assuming the token is passed in the header

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (!file.isPublic && file.userId !== userId) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (file.type === 'folder') {
      return res.status(400).json({ error: "A folder doesn't have content" });
    }

    const filePath = path.join(__dirname, '../files', `${file.name}_${size}`);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Not found' });
    }

    const mimeType = mime.lookup(file.name);
    res.setHeader('Content-Type', mimeType);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

