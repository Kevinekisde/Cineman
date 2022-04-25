import { useDispatch } from "react-redux";
import { login } from "../../redux/actions.js";
import {
  ButtonHome,
  LandingButtons,
  LandingContent,
  StyledLink,
} from "./LandingPageStyles.js";

export default function LandingPage() {
  const dispatch = useDispatch();

  return (
    <LandingContent>
      <LandingButtons>
        <button onClick={() => dispatch(login)}>Ingresar</button>
        <button>Registrate</button>
      </LandingButtons>
      <ButtonHome>
        <h1>CINEMAN</h1>
        <StyledLink to="/home">
          <button>get in</button>
        </StyledLink>
      </ButtonHome>
    </LandingContent>
  );
}
