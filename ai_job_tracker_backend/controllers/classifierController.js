exports.classifyEmail = async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post("http://127.0.0.1:4000/classify", {
      text: text,
    });
    const classification = response.data.classification;
    res.status(200).json({ classification });
  } catch (error) {
    console.error("Error classifying email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while classifying the email." });
  }
};
