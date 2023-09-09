import MainHeader from "./components/TopSection/MainHeader";
import Projects from "./components/Projects";
import classes from './Homepage.module.css'


function Homepage() {

  return (
    <div className={classes['homepage']}>
        <MainHeader />
        <Projects />
    </div>
  );
}

export default Homepage;
