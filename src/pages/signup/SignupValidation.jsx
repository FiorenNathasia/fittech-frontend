function Validation(values) {
  let error = {};
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.name === "") {
    error.name = "Name should not be empty";
  } else {
    error.name = "";
  }
  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email format is incorrect";
  } else {
    error.email = "";
  }

  if (values.password === "") {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password does not follow password patternf";
  } else {
    error.password = "";
  }

  if (values.confirmPassword === "") {
    error.confirmPassword = "Confirm password should not be empty";
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = "Password do not match";
  } else {
    error.confirmPassword = "";
  }
  return error;
}

export default Validation;
