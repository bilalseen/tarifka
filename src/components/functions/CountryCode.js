export default function getCountryCode(country) {
  switch (country) {
    case "American":
      return "us";
    case "British":
      return "gb";
    case "Canadian":
      return "ca";
    case "Chinese":
      return "cn";
    case "Dutch":
      return "nl";
    case "Egyptian":
      return "eg";
    case "French":
      return "fr";
    case "Greek":
      return "gr";
    case "Indian":
      return "in";
    case "Irish":
      return "ie";
    case "Italian":
      return "it";
    case "Jamaican":
      return "jm";
    case "Japanese":
      return "jp";
    case "Kenyan":
      return "ke";
    case "Malaysian":
      return "my";
    case "Mexican":
      return "mx";
    case "Moroccan":
      return "ma";
    case "Russian":
      return "ru";
    case "Spanish":
      return "es";
    case "Thai":
      return "th";
    case "Tunisian":
      return "tn";
    case "Turkish":
      return "tr";
    case "Vietnamese":
      return "vn";
    default:
      return "us";
  }
}
