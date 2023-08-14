import MainHeader from "./components/MainHeader";
import Projects from "./components/Projects";
import classes from './App.module.css'


function App() {
  return (
    <div className={classes['homepage']}>
      <MainHeader />
      <Projects />
    </div>
  );
}

export default App;
