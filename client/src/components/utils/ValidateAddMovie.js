export function validate(input) {
  let errors = {};
  if (!input?.name) {
    errors.name = "Movie name is required";
  } else if (input?.name.indexOf(" ") === 0) {
    errors.name = "No empty spaces allowed";
  }

  if (!input?.sinopsis) {
    errors.sinopsis = "Sinopsis is required";
  } else if (input?.sinopsis.indexOf(" ") === 0) {
    errors.sinopsis = "No empty spaces allowed";
  }

  if (!input.image) {
    errors.image = "Image Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input?.image
    )
  ) {
    errors.image = "Image Url is invalid";
  }

  if (!input.poster) {
    errors.poster = "Poster Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input?.poster
    )
  ) {
    errors.poster = "Trailer Url is invalid";
  }

  if (!input.trailer) {
    errors.trailer = "Trailer Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input?.trailer
    )
  ) {
    errors.trailer = "Official Site Url is invalid";
  }

  if (!input.officialSite) {
    errors.officialSite = "Official Site Url is required";
  } else if (
    !/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
      input?.officialSite
    )
  ) {
    errors.officialSite = "Official Site Url is invalid";
  }

  if (!input.date) {
    errors.date = "Release date is required";
  } else if (
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input?.date)
  ) {
    errors.date = "Date is invalid";
  }

  if (!input.rating) {
    errors.rating = "Rating is required";
  } else if (input.rating > 5 || input.rating < 0) {
    errors.rating = "Rating must be above 0 and under 5";
  } else if (!Number(input.rating)) {
    errors.rating = "Rating must be a number !";
  }
  if (!input.duration) {
    errors.duration = "Movie length or duration is required";
  } else if (!Number(input.duration)) {
    errors.duration = "Duration must be a number !";
  }

  if (!input.genres.length) {
    errors.genres = "You must add at least 1 genre";
  }

  return errors;
}
