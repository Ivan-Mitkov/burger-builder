import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../..//components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";

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
    },
    isSignUp: true
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }
  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });

    // console.log('Email State:',this.state.controls.email.value)
    // console.log('Password State:',this.state.controls.password.value)
  };
  submitHandler = event => {
    //prevent reloading of the page
    event.preventDefault();
    const pass = this.state.controls.password.value;
    const em = this.state.controls.email.value;
    const isSignUp = this.state.isSignUp;
    console.log("em:", em);
    console.log("Pass:", pass);

    this.props.onAuth(em, pass, isSignUp);
  };
  switchAuthModeHandler = () => {
    this.setState((state, props) => {
      return { isSignUp: !state.isSignUp };
    });
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
    // if(this.props.loading){
    //     form=<Spinner/>
    // }

    //add error message
    let errorMessage=null;
    // console.log('error: ',this.props.error);
    if(this.props.error){
      errorMessage=(
        //.message is from firebase
        <p>Error: {this.props.error.message}</p>
      )
    }
    return (
      <div className={classes.Auth}>
      {errorMessage}
        <form onSubmit={this.submitHandler}>
          {this.props.loading ? <Spinner /> : form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch to {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
