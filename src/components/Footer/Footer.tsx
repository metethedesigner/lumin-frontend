import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2">
        © {new Date().getFullYear()} LumFlights. Tüm hakları saklıdır.
      </Typography>
    </Box>
  );
};

export default Footer;