import MainHeader from "./components/TopSection/MainHeader";
import Projects from "./components/Projects";
import classes from './App.module.css'
import FileStoreProvider from './store/FileProvider';



function App() {
  return (
    <div className={classes['homepage']}>
      <FileStoreProvider>
        <MainHeader />
        <Projects />
      </FileStoreProvider>

    </div>
  );
}

export default App;
