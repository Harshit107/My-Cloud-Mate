import classes from './Circle.module.css'

const Circle = (props) => { 

   return <div className={classes.circle}>
      {props.children}
   </div>
}
export default Circle;