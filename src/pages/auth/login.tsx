import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { handleLogin } from '@/utils/auth';
import { motion } from 'framer-motion';

export default function Login() {
  const dispatch: AppDispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/home');
    }
  }, [router]);

  const handleLoginClick = async () => {
    const result = await handleLogin(username, password, dispatch);
    if (result && typeof result === 'object' && result.id) {
      router.push('/home');
    } else if (typeof result === 'string') {
      setErrorMessage(result);
      setOpenSnackbar(true);
    } else {
      console.error('Unexpected result:', result);
    }
  };

  return (
    <Box className="login-container">
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card className="login-card">
          <CardContent>
            <Typography className="login-title">LOGIN</Typography>
            <TextField
              label="Username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="login-button" onClick={handleLoginClick}>
              Login
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {openSnackbar && <div className="snackbar">{errorMessage}</div>}
    </Box>
  );
}
