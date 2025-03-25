import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

const AuthToggle = () => {
  const [enableLogin, setEnableLogin] = useState(true);
  const [enableRegister, setEnableRegister] = useState(true);

  return (
    <Card className="mb-4">
      <CardContent className="flex flex-col gap-2">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={enableLogin}
                onChange={() => setEnableLogin(!enableLogin)}
                color="primary"
              />
            }
            label="Enable login for existing users"
          />
          <FormControlLabel
            control={
              <Switch
                checked={enableRegister}
                onChange={() => setEnableRegister(!enableRegister)}
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
