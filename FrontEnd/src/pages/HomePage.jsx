import { Container, Grid, Typography, Divider } from "@mui/material";
import MovieSlider from "../components/MovieSlider";
import MovieCardContainer from "../components/MovieCardContainer";
import SmallMovieContainer from "../components/SmallMovieContainer";

export default function HomePage() {
  return (
    <Container maxWidth="xl" className="py-10">
      <section className="mb-12">
        <Typography variant="h4" className="font-bold mb-4 text-center">
          In Theaters
        </Typography>
        <MovieSlider category="now_playing" />
      </section>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12} lg={9}>
          <Typography variant="h5" className="font-bold mb-4">
            Top Rated
          </Typography>
          <Divider className="mb-6" />
          <MovieCardContainer category="top_rated" />

          <div className="mt-10">
            <Typography variant="h5" className="font-bold mb-4">
              Popular
            </Typography>
            <Divider className="mb-6" />
            <MovieCardContainer category="popular" />
          </div>
        </Grid>

        <Grid item xs={12} md={12} lg={3}>
          <div className="sticky top-28">
            <Typography variant="h5" className="font-bold mb-4">
              Trending
            </Typography>
            <Divider className="mb-6" />
            <SmallMovieContainer category="trending" />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
