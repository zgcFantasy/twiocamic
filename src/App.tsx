import React from 'react'


const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <div>What's Up!</div>
      </header>
      <main>
        <img className='logo' src='/joker.png' alt="" />
        <div className='continue'>to be continue...</div>
        <div className='slogan'> The World Is One Country</div>
        <div className='slogan'> And Mankind Its Citizens</div>
        <div className='code'>
          npm run storybook
        </div>
      </main>
      <footer>
        Email: 925016741@qq.com | WeChat: GCGC5666
      </footer>
    </div>
  );
}

export default App;
