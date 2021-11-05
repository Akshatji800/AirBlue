import React, {useState}from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useHistory } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhoneFill } from "bootstrap-icons/icons/envelope-fill.svg";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";
import { ReactComponent as IconUsernameFill } from "bootstrap-icons/icons/file-person-fill.svg";
import {
  useMutation,
  gql
} from "@apollo/client";

const SignUpForm = (props) => {
  let history = useHistory()
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  const CREATE_USER_lOGIN = gql`
    mutation createUser(
        $email: String!
        $username: String!
        $password: String!
        ){
          createUser(
            email: $email
            username: $username
            password: $password
        ) {
          user{
            username
          }
        }
        createMiles(
          input: {
            user: $username
          }
          
        ){
          milesDetails {
            miles
          }
        }
        redeemedStatus(input: {user: $username}) {
          redeemItem {
            id
          }
        }
    }
    `

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirm] = useState("")
  const [email, setEmail] = useState("")
  const [validate, setValidate] = useState(false);

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER_lOGIN);
  const SubmitHandler = (e)=> {
    e.preventDefault();
    if(password == "" && username == "" && email == "" && confirmPassword == ""){
      setValidate(true)
    }
    else if(password == confirmPassword){
      createUser({
      variables: {
        email: email,
        username: username,
        password: password,
    },
  });
  history.push("/")
  }
    
}
  return (
    <form
      onSubmit={SubmitHandler}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <Field
        name="Username"
        type="text"
        label="Usename"
        component={renderFormGroupField}
        placeholder="Choose your desired username"
        icon={IconUsernameFill}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}
        max="999999999999999"
        min="9999"
        className="mb-3"
        onChange = {(e)=>{setUsername(e.target.value)}}
      />
      <Field
        name="email"
        type="email"
        label="Email"
        component={renderFormGroupField}
        placeholder="Fill up your email"
        icon={IconPhoneFill}
        validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
        required={true}
        max="999999999999999"
        min="9999"
        className="mb-3"
        onChange = {(e)=>{setEmail(e.target.value)}}
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
      <Field
        name="confirmpassword"
        type="password"
        label="Confirm password"
        component={renderFormGroupField}
        placeholder="******"
        icon={IconShieldLockFill}
        validate={[required, maxLength20, minLength8]}
        required={true}
        maxLength="20"
        minLength="8"
        className="mb-3"
        onChange = {(e)=>{setConfirm(e.target.value)}}
      />
      {(validate)? <>Enter every fields</>:<></>}
      <button
        type="submit"
        className="btn btn-primary btn-block mb-3"
        disabled={submitting}
      >
        Create
      </button>
      <Link className="float-left" to="/" title="Sign In">
        Sign In
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
    </form>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
