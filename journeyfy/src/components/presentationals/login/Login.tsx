import { Button, TextInput } from "dolfo";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthApiService } from "../../../services/authApiService";

export const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formType, setFormType] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }, [formType]);

  const onSubmit = async () => {
    formType === "signin"
      ? await AuthApiService.login(email, password)
      : await AuthApiService.register(
          firstName,
          lastName,
          email,
          password,
          confirmPassword
        );
  };

  return (
    <Container fluid>
      {formType === "signup" && (
        <>
          <TextInput
            required
            label="Nome"
            value={firstName}
            onChange={setFirstName}
            className="mb-2"
            autocomplete="new-password"
          />
          <TextInput
            required
            label="Cognome"
            value={lastName}
            onChange={setLastName}
            className="mb-2"
            autocomplete="new-password"
          />
        </>
      )}
      <TextInput
        required
        label="Email"
        value={email}
        onChange={setEmail}
        className="mb-2"
        autocomplete="new-password"
        icon={{ iconKey: "at", type: "far" }}
      />
      <TextInput
        required
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        togglePassword
        className="mb-2"
        autocomplete="new-password"
      />
      {formType === "signup" && (
        <TextInput
          required
          type="password"
          label="Ripeti password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          togglePassword
          className="mb-4"
          autocomplete="new-password"
        />
      )}

      <Button btnColor="green" className="col-12" onClick={onSubmit}>
        {formType === "signin" ? "Accedi" : "Registrati"}
      </Button>

      <p className="mt-2">
        {formType === "signin" ? (
          <>
            Non hai ancora un account?{" "}
            <a href="#" onClick={() => setFormType("signup")}>
              Registrati!
            </a>
          </>
        ) : (
          <>
            Hai già un account?{" "}
            <a href="#" onClick={() => setFormType("signin")}>
              Accedi!
            </a>
          </>
        )}
      </p>
    </Container>
  );
};
