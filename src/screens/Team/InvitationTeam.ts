import { useNavigate } from "react-router-dom";

export function InvitationTeam() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  if (storedToken !== null) navigate(`/home`);
  else navigate(`/login`);
}
