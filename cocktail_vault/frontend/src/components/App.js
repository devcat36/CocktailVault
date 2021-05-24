import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import MainPage from './MainPage'

function App(){
    return(
        <div className='App'>
            <MainPage />
        </div>
    )
}

export default App

ReactDOM.render(<App />, document.getElementById('app'));
