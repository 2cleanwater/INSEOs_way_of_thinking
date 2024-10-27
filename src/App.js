import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useState } from 'react';

function App() {
  const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY;

  const [userMessage, setUserMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userMessage) {
      setResponseMessage('메시지를 입력하세요.');
      return;
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`
        },
        body: JSON.stringify({
          model : "gpt-3.5-turbo",
          messages: [{"role": "user", "content": `${userMessage}에 대한 대답으로 무지성 공감을 해주는 느낌으로 반말로 말해줘`}],
          max_tokens : 500,
          temperature : 0,
          top_p : 1,
          stream : false,
          frequency_penalty : 0,
          presence_penalty : 0,
          logprobs : null
        })
      });

      const data = await response.json();
      const generatedResponse = data.choices[0].message.content.trim();
      setResponseMessage(generatedResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponseMessage('영혼 없는 답변을 생성하는 중 오류가 발생했습니다.');
    }
  };
  return (
    <Box className="App" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box component="h1" className="title" sx={{ marginBottom: '20px' }}>🤖인서적 사고 변환기🤖</Box>

      <Box component="form" onSubmit={handleSubmit} sx={{display:"flex",width:"80%",flexDirection:"column", alignItems:"center"}}>
        <Box component="textarea"     
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="여기에 메시지를 입력하세요..."
          required id="userMessage" sx={{ width: "90%", height: "100px", marginBottom: '20px' }} />
        <Button type="submit" variant="contained" id="messageButton" sx={{ width: "100px", marginBottom: '20px' }}>변환하기</Button>
      </Box>

      <Box sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, alignItems:"center" }}>
        <Box sx={{ bgcolor:"lightgray",mt:{ xs: '1rem', md: '5rem' }, width:"20rem"}}>
          <Box sx={{fontSize:"30px",fontWeight:"bolder",pt:"1rem"}}>인서적 사고 : </Box>
          <Box component="p" id="responseMessage"sx={{p:"1rem"}}>{responseMessage}</Box>
        </Box>
        <Box component="img" sx={{height:"16rem"}} src="img/inseo.png" alt="inseo" />
      </Box>
    </Box>
  );
}

export default App;