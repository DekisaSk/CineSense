import { Container, Typography, Box } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Cinsense.
      </Typography>
      <Typography variant="body1" component="p">
        Your ultimate destination for discovering and keeping track of the
        latest movies and TV shows. Whether you're searching for new releases,
        exploring hidden gems, or saving your all-time favorites, Cinsense makes
        it effortless to manage your watchlist.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, my: 2 }}>
        <img
          src="/public/assets/popcorns.svg"
          alt="Illustration of the yellow box of popcorns"
          loading="lazy"
          height="auto"
          width="45%"
        />
        <img
          src="/public/assets/film-rolls.svg"
          alt="Illustration of the film rolls"
          loading="lazy"
          height="auto"
          width="45%"
        />
      </Box>
      <Typography variant="body1" component="p">
        But we don’t stop there—our cutting-edge AI-powered recommendation
        engine takes your movie and TV show experience to the next level. Based
        on your favorite picks and search history, Cinsense suggests
        personalized recommendations, ensuring you never run out of great
        content to watch.
      </Typography>
      <Box sx={{ height: 50 }} />
      <Typography variant="h6" gutterBottom>
        Stay ahead of the entertainment curve with Cinsense—where movies and TV
        shows meet smart discovery!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <img
          src="/public/assets/movie-night.svg"
          alt="Illustration of the couple on sofa watching TV"
          loading="lazy"
          width="100%"
          height="auto"
        />
      </Box>
    </Container>
  );
}
