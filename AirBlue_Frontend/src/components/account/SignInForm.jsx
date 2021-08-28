import React , {useState} from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import {
  useMutation,
  gql
} from "@apollo/client";

import renderFormGroupField from "../../helpers/renderFormGroupField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/envelope-fill.svg";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";

const SignInForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  const [status, setStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const LOAD_USER_lOGIN = gql`
    mutation tokenAuth(
        $username: String!
        $password: String!
        ){
        tokenAuth(
            username: $username
            password: $password
        ) {
            success,
            errors,
            token,
            refreshToken
        }
    }
    `
  const [getUser, { data, loading, error }] = useMutation(LOAD_USER_lOGIN);
  const SubmitHandler = (e)=> {e.preventDefault(); getUser({
      variables: {
        username: username,
        password: password,
      },
    });
  if(data!=undefined){if(data.tokenAuth.success)(setStatus(true));}}
  return (
    <form
      onSubmit={SubmitHandler}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      {status? (<Redirect to = "/home"/>):(
        <div>
          <Field
        name="mobileNo"
        type="text"
        label="Username"
        component={renderFormGroupField}
        placeholder="Enter your registered username"
        icon={IconPhoneFill}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}
        max="999999999999999"
        min="9999"
        className="mb-3"
        onChange = {(e)=>{setUsername(e.target.value)}}
      />
      <Field
        name="password"
        type="password"
        label="Your password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLockFill}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
        onChange = {(e)=>{setPassword(e.target.value)}}
      />
      <button
        type="submit"
        className="btn btn-primary btn-block mb-3"
        disabled={submitting}
      >
        Log In
      </button>
      <Link className="float-left" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      <Link
        className="float-right"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link>
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn text-white bg-twitter mr-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="/" className="btn text-white mr-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn text-white mr-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link>
        </div>
      </div>
        </div>
      )};
      
      
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
