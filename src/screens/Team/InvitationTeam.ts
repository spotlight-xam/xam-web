import { useNavigate } from "react-router-dom";

export function InvitationTeam() {
  const navigate = useNavigate();
  const userData = localStorage.getItem("token");

  if (userData !== null) navigate(`/home`);
  else navigate(`/login`);
}
