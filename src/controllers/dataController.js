const Data = require('../dbfiles/data');

const getData = async (req, res) => {
  try {
    const data = await Data.find({ username: req.user.username });
    return res.send(data);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const createData = async (req, res) => {
  try {
    const newData = new Data(req.body);

    await newData.save();
    return res.send(newData);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const updateData = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedData = await Data.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedData) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.send(updatedData);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await Data.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).send({ message: 'Data not found' });
    }
    return res.send(deletedData);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  getData,
  createData,
  updateData,
  deleteData,
};
