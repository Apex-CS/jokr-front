import React from 'react';

import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
function Login() {
  /* Card customization*/
  const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      •
    </Box>
  );

  return (
    <>
    <Container>
      <Card sx={{ minWidth: 500, textAlign: "center"}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            be{bull}nev{bull}o{bull}lent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
          <Button size="small">Learn More</Button>
      </Card>

      {/*       <div className="signin-content">
        <div className="signin-image">
          <figure>
            <Image height="100" width="100" src={Singin} alt="sing up image" />
          </figure>
          <Link href="/signup">
            <a className="signup-image-link">Create an account</a>
          </Link>
        </div>

        <div className="signin-form">
          <h2 className="form-title">Login</h2>
          <form method="POST" className="register-form" id="login-form" action="/login">
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-account material-icons-name"></i>
              </label>
              <input type="text" name="email" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                <i className="zmdi zmdi-lock"></i>
              </label>
              <input type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="form-group">
              <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
              <label htmlFor="remember-me" className="label-agree-term">
                <span>
                  <span></span>
                </span>
                Remember me
              </label>
            </div>
            <div className="form-group form-button">
              <input
                type="submit"
                name="signin"
                id="signin"
                className="form-submit"
                value="Log in"
              />
            </div>
          </form>

          <div className="social-login">
            <span className="social-label">Or login with</span>
            <ul className="socials">
              <li>
                <a href="#">
                  <i className="display-flex-center zmdi zmdi-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="display-flex-center zmdi zmdi-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="display-flex-center zmdi zmdi-google"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      </Container>
    </>
  );
}

export default Login;
