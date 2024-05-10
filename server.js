import express from 'express'
import OpenAI from 'openai';
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(
  cors({
    origin:"*",
    credentials:true
  })
)
const PORT = process.env.PORT || 4000;
const openai = new OpenAI({
    apiKey:process.env.API_KEY
});

app.post('/v1/api/trivia',async(req,res)=>{
    const {topic} = req.body;
    try {
        const response = await openai.chat.completions.create({
          model:"gpt-3.5-turbo-0301",
          messages:[{role:"user",content:`Make 5 trivial question based on ${topic}  in a json format return the output in json format  
          {
            "Q":"Question,
            "A":"Answer"
          }  also don't frame the same question next time use different questions`}],
          n:1,
          max_tokens:500,
          temperature:0.5
        });
        const questions = [];
        const answers = []
        const ParsableJson = JSON.parse(response.choices[0].message.content)
        console.log(ParsableJson[1].Q);
        console.log(Object.keys(ParsableJson).length);
        for (let i = 1; i <= Object.keys(ParsableJson).length; i++) {
          questions.push(ParsableJson[i].Q);
          answers.push(ParsableJson[i].A);
        }
        const ParsableJsonQ = JSON.stringify(questions);
        const ParsableJsonA = JSON.stringify(answers);
        res.json({ ParsableJsonQ,ParsableJsonA});
        
      } catch (error) {
        console.error('Error generating trivia questions:', error);
        res.status(500).json({ error: 'Failed to generate trivia questions' });
      }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});