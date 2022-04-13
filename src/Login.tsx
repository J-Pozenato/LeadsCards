import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);

//state type

type State = {
  username: string
  password:  string
  confirmPassword: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  username: '',
  password: '',
  confirmPassword: ' ',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setUsername', payload: string }
  | { type: 'setPassword', payload: string }
  | { type: 'setConfirmPassword', payload: string}
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'RegisterSuccess', payload: string }
  | { type: 'RegisterFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
      };
    case 'setConfirmPassword': 
      return {
        ...state,
        confirmPassword: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'RegisterSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'RegisterFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.password.trim() && state.confirmPassword.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.username, state.password, state.confirmPassword]);

  const handleRegister = () => {
    if (state.confirmPassword !== state.password) {
      dispatch({
        type: 'RegisterFailed',
        payload: 'Password e confirmação não são iguais'
      });
    } 
    else if (!strongPassword.test(state.password))
    {
      dispatch({
        type: 'RegisterFailed',
        payload: 'Password precisa ser forte: com pelo menos 8 caracteres, um numero uma letra maiscula, uma letra minuscula e um caractere especial'
      });
    }
    else 
    {
      dispatch({
        type: 'RegisterSuccess',
        payload: 'Registrado com sucesso'
      })
      const usuario = {
        email: state.username,
        senha: state.password,
      }
      window.localStorage.setItem('user',JSON.stringify(usuario));
      
    }
  };
  let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      state.isButtonDisabled || handleRegister();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }

  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch(
        {
          type: 'setConfirmPassword',
          payload: event.target.value
        }
      );
  }



  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Faça o Cadastro" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
              label="Email"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirma Password"
              placeholder="Confirma Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handleConfirmPasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleRegister}
            disabled={state.isButtonDisabled}>
            Login
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default Login;