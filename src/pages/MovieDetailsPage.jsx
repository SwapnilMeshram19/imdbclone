import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  errorMovieDetails,
  getMovieDetails,
  loadingMovieDetails,
} from "../store/moviedetails/action";
import { MovieCard } from "../components/moviedetails/MovieCard";
import { MoviesRating } from "../components/moviedetails/MoviesRating";
import { MovieTopLinks } from "../components/moviedetails/MovieTopLinks";
import { MovieTitle } from "../components/moviedetails/MovieTitle";
import { MovieGenres } from "../components/moviedetails/MovieGenres";
import { MovieInfo } from "../components/moviedetails/MovieInfo";
import { Heading } from "../components/moviedetails/Headings";
import { Cast } from "../components/moviedetails/Cast";
import { Details } from "../components/moviedetails/Detaisl";
import { BoxOffice } from "../components/moviedetails/BoxOffice";
import { RightPanel } from "../components/moviedetails/RightPanel";
import { ImageSlider } from "../components/moviedetails/ImageSlider";
import { Loading } from "../components/Loading";
import { MovieSlider } from "../components/moviedetails/MovieSlider";
export const MovieDetailsPage = () => {
  const { loading, error, movieDetails } = useSelector(
    (state) => state.movieDetails
  );


  const movieData = movieDetails[0];
  const dispatch = useDispatch();

  let id = "tt8426926";

  useEffect(() => {
    dispatch(loadingMovieDetails());
    axios({
      method: "get",
      url: `http://localhost:8080/movieDetails?id=${id}`,
    })
      .then((res) => {
        dispatch(getMovieDetails(res.data));
      })
      .catch((err) => dispatch(errorMovieDetails()));
  }, [dispatch]);
  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Box variant="div" sx={{ backgroundColor: "black", padding: "10px 0px" }}>
        <img
          src="https://m.media-amazon.com/images/I/51IfG+VoQ8L.jpg"
          alt="google ads"
        />
      </Box>
      {movieDetails.length === 0 ? (
        <Loading />
      ) : (
        <div style={{ width: "100%", backgroundColor: "rgb(31,31,31)" }}>
          <Box
            variant="div"
            sx={{ width: "90%", margin: "auto", marginBottom: "50px" }}
          >
            <MovieTopLinks />
            <Box
              variant="div"
              sx={{
                display: "flex",
                position: "relative",
                alignItems: "center",
                flexFlow: "column-wrap",
                alignContent: "space-between",
              }}
            >
              <MovieTitle movieData={movieData} />

              <MoviesRating movieData={movieData} />
            </Box>

            <MovieCard movieData={movieData} />

            <Box variant="div" sx={{}}>
              <Box
                variant="div"
                sx={{ textAlign: "left", display: "flex", gap: "10px" }}
              >
                {movieData.genres.split(", ").map((ele) => (
                  <MovieGenres genres={ele} key={ele} />
                ))}
              </Box>

              <Box variant="div">
                <MovieInfo movieData={movieData} />
              </Box>
            </Box>
          </Box>

          <Box
            variant="div"
            sx={{
              backgroundColor: "white",
              width: "100%",
              paddingBottom: "50px",
            }}
          >
            <Box
              variant="div"
              sx={{
                width: "90%",
                margin: "auto",
                paddingTop: "20px",
                display: "flex",
              }}
            >
              <Box variant="div" sx={{ width: "62%" }}>
                <Heading headingString={"Photos"} arrow={true} />

                <ImageSlider images={movieData.images.items} />
                <Box variant="div" sx={{ width: "100%" }}>
                  <Heading headingString={"Top Cast"} arrow={true} />

                  <Cast actorList={movieData.actorList} />
                </Box>

                <Box variant="div" sx={{width:"100%", marginTop:"50px"}}>
                <Heading headingString={"More like this"} arrow={false}/>
                <MovieSlider data={movieData.similars}/>

                </Box>
                <Box
                  variant="div"
                  sx={{ width: "100%", margin: "auto", paddingTop: "20px" }}
                >
                  <Heading headingString={"Details"} arrow={false} />

                  <Details movieData={movieData} />
                </Box>
                <Box
                  variant="div"
                  sx={{ width: "100%", margin: "auto", paddingTop: "20px" }}
                >
                  <Heading headingString={"Box Office"} arrow={false} />

                  <BoxOffice movieData={movieData} />
                </Box>

                
              </Box>

              <Box variant="div" sx={{ width: "28%", padding: "0px 40px" }}>
                <RightPanel />
              </Box>
            </Box>
          </Box>
        </div>
      )}{" "}
    </div>
  );
};