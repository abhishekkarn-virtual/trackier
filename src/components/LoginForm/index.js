import {
  TextField,
  Card,
  Grid,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UsersReducerActions } from "../../store/users";

const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "username must be more than five character")
    .required(),
  password: yup
    .string()
    .min(5, "password must have 5-8 characters")
    .max(8, "password must have 5-8 characters")
    .required(),
});

const registerValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email address")
    .max(255)
    .required("Email is required"),
  username: yup
    .string()
    .min(5, "username must be more than five character")
    .required(),
  password: yup
    .string()
    .min(5, "password must have 5-8 characters")
    .max(8, "password must have 5-8 characters")
    .required(),
});

export const LoginForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);
  console.log(location);

  let initialValues;
  let validationSchema;
  let loginInitialValues = {
    username: "",
    password: "",
  };

  let registerInitialValues = {
    username: "",
    password: "",
    email: "",
  };
  if (location.pathname == "/login") {
    initialValues = loginInitialValues;
    validationSchema = loginValidationSchema;
  } else if (location.pathname == "/register") {
    initialValues = registerInitialValues;
    validationSchema = registerValidationSchema;
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (location.pathname == "/register") {
        console.log("submit values", values);
        dispatch(UsersReducerActions.registerUser(values));
        navigate("/login");
      } else if (location.pathname == "/login") {
        dispatch(UsersReducerActions.userLogin(values));
      }
    },
  });
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("i am being clicked");
    formik.handleSubmit();
    console.log(data);
    if (data.activeUser && !data.errorstate) {
      navigate("/dashboard");
    }
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
      <Card className="form">
        <CardContent>
          <Typography variant="h6">
            {location.pathname == "/login" ? "Login" : "Register"}
          </Typography>
        </CardContent>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={12} lg={12} sm={12} xs={12} m={2}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                onChange={formik.handleChange}
                variant="outlined"
                value={formik.values.username}
                size="small"
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            {location.pathname == "/register" && (
              <Grid md={12} lg={12} sm={12} xs={12} m={2}>
                <TextField
                  fullWidth
                  label="email"
                  name="email"
                  onChange={formik.handleChange}
                  variant="outlined"
                  value={formik.values.email}
                  size="small"
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            )}
            <Grid md={12} lg={12} sm={12} xs={12} m={2}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                onChange={formik.handleChange}
                variant="outlined"
                value={formik.values.password}
                size="small"
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid md={12} lg={12} sm={12} xs={12} m={2}>
              <Button type="submit" variant="contained" fullWidth>
                {location.pathname == "/login" ? "Login" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
