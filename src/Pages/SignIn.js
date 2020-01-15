import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { pink } from '@material-ui/core/colors';
import { Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';


class SingIn extends Component {
  constructor() {
    super()
    this.state = {
      showingPassword : false,
      centered : {
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
    console.log(obj)
    return obj
  }

// showingPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
render() {
  const { centered, showingPassword } = this.state;
  return (
    <div style={{ background: 'linear-gradient(to right, #1d4350, #a43931)', height: "100vh" }}>

      <Grid container direction="row" justify='center' alignItems="center" style={{ height: '100%' }}>

        <Grid 
        item xs={11} sm={8} lg={6} xl={3}>

          <Card style={Object.assign({}, centered, this.space('p','a','32'), this.space('m','x','auto'), {maxWidth : '365px'})} elevation={10}>

            <Avatar style={Object.assign({ backgroundColor: pink[500] }, this.space('m', 'b', 12))}  >
              <LockOutlinedIcon />
            </Avatar>

            <Typography align='center' variant='h5'>
              Sign In
            </Typography>

            <form style={{ width: '100%' }}>

              <TextField id="outlined-basic" style={this.space('m', 'y', 24)} fullWidth={true} label="Email Address*" variant="outlined" />

              <TextField


                InputProps={{ endAdornment: <InputAdornment onClick={() => this.setState({showingPassword: !showingPassword})}>
                {showingPassword 
                  ? <VisibilityOffIcon />
                  : <VisibilityIcon /> }
                </InputAdornment> }}
                type={showingPassword ? 'text' : 'password'}
                id="outlined-basic"
                style={this.space('m', 'b', 24)}
                fullWidth={true} label="Password*"
                variant="outlined" />

              <FormControlLabel style={this.space('m', 'b', 24)}
                control={
                  <Checkbox
                    value="true"
                    color="primary"
                  />}
                label="Remember me"/>

            </form>

              <Button fullWidth={true} variant="contained" color="primary" size='large'>
                Sign In
              </Button>

          </Card>

        </Grid>

      </Grid>

    </div>
  )
}
}
export default SingIn