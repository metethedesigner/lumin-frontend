import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  return (
    <Box className="home-container">
      {/* Blur efekti */}
      <Box className="home-blur" />

      {/* İçerik Konteyneri */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="home-content"
      >
        <Container>
          <Typography className="home-title">LumiFlights</Typography>
          <Typography className="home-description">
            Discover the world with us. Experience luxury and comfort.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLoginClick}
            className="home-login-btn"
          >
            Login
          </Button>
        </Container>
      </motion.div>
    </Box>
  );
}