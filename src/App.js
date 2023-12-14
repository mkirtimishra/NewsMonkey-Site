import React, {useState, Fragment} from 'react';
import NavBar from './component/NavBar';
import News from './component/News';
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App=()=> {
  const apiKey=process.env.REACT_APP_News_API
  const[progress, setProgress]=useState();

    return (
    <div>
       
      <Router>
        <Fragment>
        <NavBar/>
         <LoadingBar 
         height={3}
         color='#f11946' 
         progress={progress}
          />
        
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country="in" category='general'/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10} country="in" category='business'/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="" pageSize={10} country="in" category='entertainment'/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country="in" category='general'/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={10} country="in" category='health'/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={10} country="in" category='science'/>}/>
          <Route exact path="/sport" element={<News setProgress={setProgress} apiKey={apiKey} key="sport" pageSize={10} country="in" category='sport'/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={10} country="in" category='technology'/>}/>
        </Routes>
        </Fragment>
      </Router>
    </div>
  );
    
}
export default App;






//class based component

// import React, {Component, Fragment} from 'react';
// import NavBar from './component/NavBar';
// import Newsss from './component/Newsss';
// import{
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from "react-router-dom";
// import LoadingBar from 'react-top-loading-bar';


// export default class App extends Component {
//   apiKey=process.env.REACT_APP_NEWS_API
//   state={
//     progress:0
//   }
//   setProgress=(progress)=>{
//     setState({progress:progress})
//   }
//   render(){
//     return (
//     <div>
       
//       <Router>
//         <Fragment>
//         <NavBar/>
//          <LoadingBar 
//          height={3}
//          color='#f11946' 
//          progress={state.progress}
//           />
        
//         <Routes>
//           <Route exact path="/" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country="in" category='general'/>}/>
//           <Route exact path="/business" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10} country="in" category='business'/>}/>
//           <Route exact path="/entertainment" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="" pageSize={10} country="in" category='entertainment'/>}/>
//           <Route exact path="/general" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country="in" category='general'/>}/>
//           <Route exact path="/health" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="health" pageSize={10} country="in" category='health'/>}/>
//           <Route exact path="/science" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="science" pageSize={10} country="in" category='science'/>}/>
//           <Route exact path="/sport" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="sport" pageSize={10} country="in" category='sport'/>}/>
//           <Route exact path="/technology" element={<Newsss setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={10} country="in" category='technology'/>}/>
//         </Routes>
//         </Fragment>
//       </Router>
//     </div>
//   );
//   }
// }


