import React, { Component } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../..//components/UI/Button/Button";
import  classes from './Auth.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };
  render() {
    //loop through state object
    const elementsArray = [];
    for (let key in this.state.controls) {
      elementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = elementsArray.map(elem => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        elementConfig={elem.config.elementConfig}
        value={elem.config.value}
        //select doesn't have validataion so we can't use !elem.config.valid it will be always false for select
        invalid={elem.config.valid === false}
        touched={elem.config.touched === true}
        //because we need method identifier we have to use anonymous function instead simple reference
        changed={event => this.inputChangedHandler(event, elem.id)}
      />
     
    ));
    return (
      <div className={classes.Auth}>
        <form>
            {form}
             <Button btnType='Success'>Submit</Button>
        </form>
      </div>
    );
  }
}

export default Auth;
