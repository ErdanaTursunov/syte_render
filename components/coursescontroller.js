
const Courses = require('../models/Courses');



const coursescontroller =  async (req, res) => {
  try {
    const { title, description, maxdescription } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !description || !image) {
      return res.status(400).json({ status: 'error', message: 'Title, description, and image are required' });
    }

    const course = await Courses.create({
      title:title,
      description:description,
      image:image,
      maxDescription:maxdescription,
    });

    res.status(201).json({ status: 'success', message: 'Course uploaded successfully', course });
  } catch (error) {
    console.error('Error uploading course:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};


module.exports = {coursescontroller};