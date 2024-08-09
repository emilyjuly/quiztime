# QuizTime

A quiz developed using React, Typescript and CSS. With 3 topics, UX/UI Design, Frontend and Backend. Each topic has 3 levels, easy, mid and hard.
<hr>

### <a href="https://quiztime-taupe.vercel.app/" target="_blank">Access here the demo</a>

### 📌 Rules

#### General Rules
<strong>Quiz Duration:</strong> Each quiz has a maximum duration of 3 minutes. <br>
<strong>Number of Questions:</strong> Each quiz consists of 10 questions. <br>
<strong>Topics:</strong> The quiz covers three main topics: UX/UI Design, Backend, and Frontend. <br>
<strong>Levels:</strong> Each topic is divided into three levels: Easy, Medium, and Hard.
#### Scoring and Progression
<strong>Scoring:</strong> <br>
- Each correct answer earns 10 points. <br>
- No points are deducted for incorrect answers. <br>
<strong>Progression:</strong>
- Players must complete the Easy level to unlock the Medium level for each topic. <br>
- Players must complete the Medium level to unlock the Hard level for each topic. <br>
<strong>Completion:</strong>
- Players who complete all three levels in a topic will receive a certificate of completion for that topic. <br>
- Players who complete all levels in all three topics will receive a master certificate. <br>
#### Additional Rules
<strong>Time Management:</strong> <br>
- Players must manage their time effectively to answer all questions within the 3-minute limit. <br>
- There is no penalty for unanswered questions, but they do not contribute to the score. <br>
#### Cheating:
- Use of external resources or assistance during the quiz is strictly prohibited. <br>
- Any violation of this rule will result in immediate disqualification. <br>
#### Feedback:
- At the end of each quiz, players will receive feedback on their performance, including correct answers and explanations. <br>

### 📌 Technologies used
- React <br>
- Typescript <br>
- CSS <br>

### 📌 How to run the project locally

1. Clone the Repository
Open your terminal and run the following command to clone the repository to your local machine: <br>
<code>git clone https://github.com/emilyjuly/quiztime.git</code>

2. Navigate to the Project Directory
Move into the project directory with: <br>
<code>cd quiztime</code>

3. Install Dependencies
Install the required dependencies using npm or yarn. If you're using npm, run: <br>
<code>npm install</code> <br>
Or if you're using yarn, run: <br>
<code>yarn install</code>

4. Run the Project
After the dependencies are installed, start the development server by running:<br>
<code>npm run dev</code> <br>
Or if you're using yarn, run: <br>
<code>yarn run dev</code>

5. Open in Browser
The project should now be running locally. Open your browser and navigate to:
http://localhost:3000

### 📌 Observations
- This project was developed using the mobile first technique, so is resposive for mobile devices
- Here you can access the project prototype in figma <a href="https://www.figma.com/design/Man69QDkg1qzneanJih4yy/Quiz-time?node-id=0-1&t=RL3q8UzDwfKcmvTj-1" target="_blank">protype</a>
- Questions are consumed from some ready-made jsons
- User progress is saved on local storage
- There is an alert that appears when the user refreshes the page in the middle of a quiz, informing them that they will lose their progress
