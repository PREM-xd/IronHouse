const groq =
  require("../config/groq");

const askCoach = async (
  req,
  res
) => {
  try {

    const { question } =
      req.body;

    const completion =
      await groq.chat.completions.create(
        {
          messages: [
            {
              role: "system",
              content:
                "You are IronHouse Coach AI. Give practical fitness, nutrition, bodybuilding, powerlifting and recovery advice. Keep answers concise and useful.Keep answers under 150 words.Use bullet points when possible.Be direct and practical. "
            },
            {
              role: "user",
              content:
                question
            }
          ],

          model:
            "llama-3.3-70b-versatile"
        }
      );

    res.json({
      answer:
        completion.choices[0]
          .message.content
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }
};

module.exports = {
  askCoach
};