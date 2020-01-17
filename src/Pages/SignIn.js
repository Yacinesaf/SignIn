import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { pink } from '@material-ui/core/colors';
import { Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class SingIn extends Component {
  constructor() {
    super()
    this.state = {
      showingPassword: false,
      email: 'test@gmail.com',
      password: 'testooo',
      checkBoxChecked: false,
      passwordErrorMsg: 'Password needs to be at least 6 characters',
      emailErrorMsg: 'Invalid Email',
      validEmail: 'qwerty@gmail.com',
      validPassword: '1234567',
      centered: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },

    }
  }

  space = (type, direction, value) => {
    let types = { m: 'margin', p: 'padding' }
    let directions = { l: 'Left', r: 'Right', t: 'Top', b: 'Bottom', a: '' }
    let obj = {}
    let val = value === "auto" ? 'auto' : value + 'px'

    if (!['x', 'y'].includes(direction)) {
      let key = types[type] + directions[direction]
      obj[key] = val
    }
    else if (direction === 'x') {
      obj[types[type] + 'Left'] = val
      obj[types[type] + 'Right'] = val
    }
    else if (direction === 'y') {
      obj[types[type] + 'Top'] = val
      obj[types[type] + 'Bottom'] = val
    }
    return obj
  }

  isEmailValid = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleChangeEventEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  }

  handleChangeEventPass = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  isPasswordValid = (password) => {
    return password.length >= 6
  }

  isFormValid = () => {
    return this.isEmailValid(this.state.email) && this.state.checkBoxChecked && this.isPasswordValid(this.state.password)
  }

  showSnackBar = () => {
    return this.state.password === this.state.validPassword && this.state.email === this.state.validEmail && this.state.checkBoxChecked
  }

  render() {
    const { centered, showingPassword, checkBoxChecked, password } = this.state;
    let isFormValid = this.isFormValid();
    let showSnackBar = this.showSnackBar()
    return (
      <div style={{ background: 'linear-gradient(to right, #1d4350, #a43931)', height: "100vh" }}>

        <Grid container direction="row" justify='center' alignItems="center" style={{ height: '100%' }}>

          <Grid
            item xs={11} sm={8} lg={6} xl={3}>

            <Card style={Object.assign({}, centered, this.space('p', 'a', '32'), this.space('m', 'x', 'auto'), { maxWidth: '365px' })} elevation={10}>

              <Avatar style={Object.assign({ backgroundColor: pink[500] }, this.space('m', 'b', 12))}  >
                <LockOutlinedIcon />
              </Avatar>

              <Typography align='center' variant='h5'>
                Sign In
            </Typography>

              <form style={{ width: '100%' }}>

                <TextField
                  error={!this.isEmailValid(this.state.email)}
                  helperText={this.isEmailValid(this.state.email) ? '' : this.state.emailErrorMsg}
                  onChange={this.handleChangeEventEmail}
                  id="outlined-basic"
                  style={this.space('m', 'y', 24)}
                  fullWidth={true} label="Email Address"
                  variant="outlined" />

                <TextField
                  onChange={this.handleChangeEventPass}
                  error={!this.isPasswordValid(password)}
                  helperText={!this.isPasswordValid(password) ? this.state.passwordErrorMsg : ''}
                  InputProps={{
                    endAdornment: <InputAdornment onClick={() => this.setState({ showingPassword: !showingPassword })}>
                      {showingPassword
                        ? <VisibilityOffIcon />
                        : <VisibilityIcon />}
                    </InputAdornment>
                  }}
                  type={showingPassword ? 'text' : 'password'}
                  id="outlined-basic"
                  style={this.space('m', 'b', 24)}
                  fullWidth={true} label="Password"
                  variant="outlined" />

                <FormControlLabel
                  onClick={(e) => { e.preventDefault(); this.setState({ checkBoxChecked: !checkBoxChecked }) }}
                  style={this.space('m', 'b', 24)}
                  control={<Checkbox color="primary" checked={checkBoxChecked} />}
                  label="Accept the terms & conditions" />

              </form>

              <Button
                onClick={() => {this.setState({ showSnackBar: true })}}
                disabled={!isFormValid}
                fullWidth={true}
                variant="contained"
                color="primary"
                size='large'>
                Sign In
              </Button>
              <Snackbar
                onClose={() => {this.setState({ showSnackBar: false })}}
                open={this.state.showSnackBar}
                autoHideDuration={3000}>
                <Alert elevation={6} variant="filled" severity={showSnackBar ? "success" : "error"}>
                  {showSnackBar ? 'You are Signed In !' : 'Incorrect inputs'}
                </Alert>
              </Snackbar>
            </Card>

          </Grid>

        </Grid>

      </div>
    )
  }
}
export default SingIn