import classes from './Circle.module.css'

const Circle = (props) => { 
   const className =`${props.className ?? ''} ${classes.circle}`

   return <div className={className}>
      {props.children}
   </div>
}
export default Circle;