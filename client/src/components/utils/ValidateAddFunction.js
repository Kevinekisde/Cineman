export function validate(input) {
  let errors = {};
  if (!input?.movie) {
    errors.movie = "A movie is required to create a function";
  }

  if (!input?.sala) {
    errors.sala = "it is necessary to specify a room";
  }

  if (!input.time) {
    errors.time = "Function time must be specified";
  } else if (!/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(input?.time)) {
    errors.time =
      "Invalid format (it must be on 24h format hh:mm including ':' in middle ";
  }

  if (!input.date) {
    errors.functionDate = "Function date must be specified";
  } else if (
    !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input?.date)
  ) {
    errors.functionDate =
      "Date is invalid(it must be yyy-mm-dd including the middle dash '-')";
  }

  return errors;
}
