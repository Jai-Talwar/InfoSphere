
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes ,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
export default class App extends Component {
state = {progress:0}
setprogress = (progress)=>{
  this.setState({
    progress:progress
  })
}
  render() {
    return (
      <div>
        <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height = {2.5}
        onLoaderFinished={() => this.setprogress(0)}
      />
      

          <Navbar/>
          <Routes>
            <Route exact path = "/" element = {<News setprogress = {this.setprogress}  key = "general" pageSize={10} category = "general"></News>}></Route>
             <Route exact path='/business' element = {<News  setprogress = {this.setprogress}  key = "business" pageSize={10} category="business"/>}></Route>

             <Route exact path='/entertainment' element={ <News setprogress = {this.setprogress}  key = "entertainment" pageSize={10} category="entertainment"/>}></Route>
             <Route exact path='/general' element ={ <News setprogress = {this.setprogress}  key = "general" pageSize={10} category="general"/>}></Route>
             <Route exact path='/health' element = { <News setprogress = {this.setprogress}  key = "h" pageSize={10} category="health"/>}></Route>
             <Route exact path='/science' element = { <News setprogress = {this.setprogress}  key = "s" pageSize={10} category="science"/>}></Route>
             <Route exact path='/sports' element = { <News setprogress = {this.setprogress}  key = "sports" pageSize={10} category="sports"/>}></Route>
             <Route exact path='/technology' element = {<News setprogress = {this.setprogress}  key = "technology" pageSize={10} category="technology"/>}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}
