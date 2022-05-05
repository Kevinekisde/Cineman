export function validate(input) {
  let errors = {};
  if (!input[0]?.name) {
    errors.name = "Movie name is required";
  } else if (input[0]?.name.indexOf(" ") === 0) {
    errors.name = "No empty spaces allowed";

    // } else if (MovieExists) {
    //   errors.name = "this movie already exists on db";
  } else if (!input[0]?.sinopsis) {
    errors.sinopsis = "Sinopsis is required";
  } else if (input[0]?.sinopsis.indexOf(" ") === 0) {
    errors.sinopsis = "No empty spaces allowed";
  } else if (!input[0].image) {
    errors.image = "Image Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input[0]?.image
    )
  ) {
    errors.image = "Image Url is invalid";
  } else if (!input[0].poster) {
    errors.poster = "Poster Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input[0]?.poster
    )
  ) {
    errors.poster = "Trailer Url is invalid";
  } else if (!input[0].trailer) {
    errors.trailer = "Trailer Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input[0]?.trailer
    )
  ) {
    errors.trailer = "Official Site Url is invalid";
  } else if (!input[0].officialSite) {
    errors.officialSite = "Official Site Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input[0]?.officialSite
    )
  ) {
    errors.officialSite = "Official Site Url is invalid";
  } else if (!input[0].date) {
    errors.date = "Release date is required";
  } else if (
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input[0]?.date)
  ) {
    errors.date = "Date is invalid";
  } else if (!input[0].rating) {
    errors.rating = "Rating is required";
  } else if (input[0].rating > 5 || input[0].rating < 0) {
    errors.rating = "Rating must be above 0 and under 5";
  } else if (!Number(input[0].rating)) {
    errors.rating = "Rating must be a number !";
  } else if (!input[0].duration) {
    errors.duration = "Movie length or duration is required";
  } else if (!Number(input[0].duration)) {
    errors.duration = "Duration must be a number !";
  } else if (!input[0].genres.length) {
    errors.genres = "You must add at least 1 genre";
  }

  //  Functions ----------
  if (!input[1]?.movie) {
    errors.movie = "A movie is required to create a function";
  } else if (!input[1]?.sala) {
    errors.sala = "it is necessary to specify a room";
  } else if (!input[1].time) {
    errors.time = "Function time must be specified";
  } else if (!/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(input[1]?.time)) {
    errors.time =
      "Invalid format (it must be on 24h format hh:mm including ':' in middle ";
  } else if (!input[1].date) {
    errors.functionDate = "Function date must be specified";
  } else if (
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input[1]?.date)
  ) {
    errors.functionDate =
      "Date is invalid(it must be yyy-mm-dd including the middle dash '-')";
  }

  return errors;
}
