import {
  Card,
  CardContent,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import useAuthToggle from "../../hooks/useAuthToggle";

const AuthToggle = () => {
  const { enableLogin, toggleLogin, enableRegister, toggleRegister } =
    useAuthToggle();

  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col gap-2">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enableLogin}
                onChange={toggleLogin}
                color="primary"
              />
            }
            label="Enable login for existing users"
          />
          <FormControlLabel
            control={
              <Switch
                checked={enableRegister}
                onChange={toggleRegister}
                color="primary"
              />
            }
            label="Allow registering new accounts"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default AuthToggle;
