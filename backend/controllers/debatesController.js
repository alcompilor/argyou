import Debate from "../models/debatesModel.js";

export const getAllDebates = async (req, res) => {
  try {
    const debates = await Debate.find({});
    if (debates.length === 0) {
      return res.status(404).json({ error: "The debates collection is empty" });
    }
    res.status(200).json(debates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDebate = async (req, res) => {
  try {
    const { title, creatorUsername, startTime, thumbnail, questions } =
      req.body;
    const debate = await Debate.create({
      title,
      creatorUsername,
      startTime,
      thumbnail,
      questions,
    });

    res.status(200).json(debate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDebate = async (req, res) => {
  try {
    const { _id } = req.params;
    const debate = await Debate.findById(_id);

    if (!debate) {
      return res.status(404).json({ error: "Debate doesn't exists" });
    }
    res.status(200).json(debate);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

export const deleteDebate = async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await Debate.deleteOne({ _id: _id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Debate doesn't exist" });
    }

    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateDebate = async (req, res) => {
  try {
    const {
      title,
      creatorUsername,
      startTime,
      thumbnail,
      questions,
      status,
      messages,
      comments,
    } = req.body;
    const { _id } = req.params;

    const debate = await Debate.findOneAndUpdate(
      { _id: _id },
      {
        title,
        creatorUsername,
        startTime,
        thumbnail,
        questions,
        status,
        messages,
        comments,
      },
      { new: true, runValidators: true }
    );

    if (!debate) {
      return res.status(404).json({ error: "Failed to update the debate" });
    }
    res.status(200).json(debate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content, username } = req.body;
    const { _id } = req.params;

    let debate = await Debate.findById(_id);
    if (!debate) {
      return res.status(404).json({ error: "Debate doesn't exist" });
    }

    debate.comments.push({ content, username });
    debate = await debate.save();

    if (!debate) {
      return res.status(404).json({ error: "Failed to add chat message" });
    }
    res.status(200).json({ message: "New chat message has been added" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
