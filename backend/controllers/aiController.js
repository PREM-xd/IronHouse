const groq =
  require("../config/groq");

const generateFitnessPlan =
  async (req, res) => {
    try {

      const {
        age,
        gender,
        height,
        weight,
        experience,
        bench,
        squat,
        deadlift,
        goal,
      } = req.body;

      const prompt = `
You are an elite fitness coach.

User Details:

Age: ${age}
Gender: ${gender}
Height: ${height} cm
Weight: ${weight} kg
Training Experience: ${experience}

Bench Press: ${bench} kg
Squat: ${squat} kg 
Deadlift: ${deadlift} kg

Goal: ${goal}
Return ONLY valid JSON:

{
  "fitnessScore":"",
  "maintenanceCalories":"",
  "recommendedCalories":"",
  "protein":"",
  "carbs":"",
  "fats":"",
  "workoutSplit":"",
  "cardio":"",
  "advice":""
}

fitnessScore should be in format:
"78/100"

Do not include markdown.
Do not include markdown code blocks.
Do not include any text outside the JSON object.
`;

      const completion =
        await groq.chat.completions.create(
          {
            messages: [
              {
                role: "user",
                content:
                  prompt,
              },
            ],

            model:
              "llama-3.3-70b-versatile",
          }
        );

     const plan =
  completion.choices[0]
    .message.content.trim();

      res.status(200).json({
        plan,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
};

module.exports = {
  generateFitnessPlan,
};