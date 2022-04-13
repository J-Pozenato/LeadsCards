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
  nome: string
  telefone:  string
  email: string
  isButtonDisabled: boolean
  helperText: string
  isError: boolean
};

const initialState:State = {
  nome: '',
  telefone: '',
  email: ' ',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};

type Action = { type: 'setNome', payload: string }
  | { type: 'setTelefone', payload: string }
  | { type: 'setEmail', payload: string}
  | { type: 'setIsButtonDisabled', payload: boolean }
  | { type: 'RegisterSuccess', payload: string }
  | { type: 'RegisterFailed', payload: string }
  | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setNome': 
      return {
        ...state,
        nome: action.payload
      };
    case 'setTelefone': 
      return {
        ...state,
        telefone: action.payload
      };
    case 'setEmail': 
      return {
        ...state,
        email: action.payload
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

const Leads = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.nome.trim() && state.telefone.trim() && state.email.trim()) {
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
  }, [state.nome, state.telefone, state.email]);

  const handleRegister = () => {
  
      dispatch({
        type: 'RegisterSuccess',
        payload: 'Registrado com sucesso'
      })
      const lead = {
        nome: state.nome,
        email: state.email,
        telefone: state.telefone,

      }
      var existingEntries = JSON.parse(window.localStorage.getItem("Leads") || '{}');
      if(existingEntries == null) existingEntries = [];
      window.localStorage.setItem('lead', JSON.stringify(lead));
      existingEntries.push(lead);
      window.localStorage.setItem("Leads", JSON.stringify(existingEntries));
      
    
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      state.isButtonDisabled || handleRegister();
    }
  };

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setNome',
        payload: event.target.value
      });
    };

  const handleCelChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch({
        type: 'setTelefone',
        payload: event.target.value
      });
    }

  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> =
    (event) => {
      dispatch(
        {
          type: 'setEmail',
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
              id="nome"
              type="name"
              label="Nome"
              placeholder="nome"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="telefone"
              type="number"
              label="Telefone"
              placeholder="00000000"
              margin="normal"
              onChange={handleCelChange}
              onKeyPress={handleKeyPress}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="Email"
              type="email"
              label="Email"
              placeholder="Email"
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

export default Leads;