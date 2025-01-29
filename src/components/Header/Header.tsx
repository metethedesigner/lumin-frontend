import { AppBar, Toolbar, Typography, Box, Chip, Button, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/usersSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'; 

interface HeaderProps {
  username: string;
  isAdmin: boolean;
}

const Header = ({ username, isAdmin }: HeaderProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    router.push('/auth/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    setLoading(false);
  }, [isAdmin]);

  if (loading) {
    return null;
  }

  return (
    <AppBar position="static" className="app-bar">
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo - Sol Tarafta */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Image 
              src="/images/logo/light-logo.svg" 
              alt="Logo" 
              width={120} 
              height={50} 
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/home')} // Logoya tıklayınca ana sayfaya yönlendirme
            />
          </Box>

          {/* Kullanıcı Bilgileri ve Logout Butonu - Sağ Tarafta */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: "black" }}>
            <Typography 
              variant="body1"
              sx={{
                fontWeight: 'bold',
                fontSize: {
                  xs: '0.8rem', // Mobil için daha küçük yazı boyutu
                  sm: '1rem',
                  md: '1.2rem', // Orta ekran için yazı boyutu
                },
                textAlign: 'right',
              }}
            >
              Welcome, {username}
            </Typography>
            {isAdmin ? (
              <Chip label="Admin" color="secondary" size="small" />
            ) : (
              <Chip label="Staff" color="error" size="small" />
            )}
            <Button 
              variant="contained"
              size="small"
              onClick={handleLogout} 
              className='logout-button'
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;