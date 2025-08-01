import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from "../../services/api";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    backgroundColor: "#f4f6f8",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  leftSide: {
    flex: 1,
    backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/public/logotipos/tela-login.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "30vh",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  },
  leftContent: {
    position: "relative",
    zIndex: 2,
    color: "#fff",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  rightSide: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    [theme.breakpoints.down("sm")]: {
      height: "70vh",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    animation: "$fadeIn 0.5s ease-in",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  inputField: {
    margin: theme.spacing(2, 0),
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& fieldset": {
        borderColor: "#ddd",
      },
      "&:hover fieldset": {
        borderColor: "#38b6ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#031c9f",
      },
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    borderRadius: "8px",
    background: "linear-gradient(to right, #031c9f, #38b6ff)",
    color: "#fff",
    "&:hover": {
      background: "linear-gradient(to right, #031c9f, #38b6ff)",
    },
    transition: "all 0.3s ease",
  },
  link: {
    marginTop: theme.spacing(2),
    textDecoration: "none",
    color: "#031c9f",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  title: {
    fontWeight: 600,
    color: "#333",
    marginBottom: theme.spacing(2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });
  const { handleLogin } = useContext(AuthContext);
  const [viewregister, setviewregister] = useState("disabled");

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchviewregister();
  }, []);

  const fetchviewregister = async () => {
    try {
      const responsev = await api.get("/settings/viewregister");
      const viewregisterX = responsev?.data?.value;
      setviewregister(viewregisterX);
    } catch (error) {
      console.error("Error retrieving viewregister", error);
    }
  };

  const handlSubmit = e => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}></div>
      <div className={classes.rightSide}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography variant="h5" className={classes.title}>
              {i18n.t("login.title") || "Login"}
            </Typography>
            <form className={classes.form} noValidate onSubmit={handlSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={i18n.t("login.form.email")}
                name="email"
                value={user.email}
                onChange={handleChangeInput}
                autoComplete="email"
                autoFocus
                className={classes.inputField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={i18n.t("login.form.password")}
                type="password"
                id="password"
                value={user.password}
                onChange={handleChangeInput}
                autoComplete="current-password"
                className={classes.inputField}
              />
              <Grid container justify="flex-end">
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <Link component={RouterLink} to="/forgetpsw" variant="body2" className={classes.link}>
                    Esqueceu sua senha?
                  </Link>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                {i18n.t("login.buttons.submit")}
              </Button>
              {viewregister === "enabled" && (
                <Grid container justify="center">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      component={RouterLink}
                      to="/signup"
                      className={classes.link}
                    >
                      {i18n.t("login.buttons.register")}
                    </Link>
                  </Grid>
                </Grid>
              )}
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;