import React, { useEffect, useState , useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
// import { cleanup } from "@testing-library/react";
 const emailReducer =(state,action )=>{
  if(action.type === 'USER_INPUT'){
  return{value:action.val, isValid:action.valid.includes('@')};


  }
  if(action.type === 'INPUT_BLUR'){
    return {value:'', isValid:false}
  }
  return{value:state.value, isValid:state.value.includes('@')};
 };
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState , dispatchEmail]= useReducer(emailReducer , {value:'' , isValid:null});

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("CLEAN EFFECT");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("check for validity!");
  //     setFormIsValid(
  //       enteredEmail.includes("@") &&
  //         enteredPassword.trim().length > 6 &&
  //         enteredCollege.trim().length > 0
  //     );
  //   }, 500);

  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword, enteredCollege]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT' , val: event.target.value});

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length>6 && enteredCollege.trim().length>0
    );
  };

  

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);


    setFormIsValid(
      emailState.isValid && event.target.value.trim().length>6 && enteredCollege.trim().length>0
    );
  };

  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
    setFormIsValid(
      emailState.isValid && enteredPassword.trim().length>6 && event.target.value.trim().length>0
    );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({tpye: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid=== false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
