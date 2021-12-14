import React from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
function Login() {
  const bull = (
    <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
      •
    </Box>
  );
  return (
    <>
      <Container>
        <Card sx={{ minWidth: 500, textAlign: 'center' }}>
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
      </Container>
    </>
  );
}
export default Login;
