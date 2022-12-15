import axios from "axios";
import { Button, Input, Layout, Link, Text } from "components";
import { Card } from "components/Card";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "state/user";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & > button {
    margin-bottom: 1rem;
  }

  a {
    color: #01c2ff;
    font-family: "Inter", sans-serif;
  }
`;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    try {
      const result = await axios.post("/api/user/login", data);
      console.log(result.data);

      dispatch(fetchUserData(result.data.id, result.data.token));

      localStorage.setItem("token", result.data.token);
      const tokenExpiration = new Date(Date.now() + 3600000).toISOString(); // Token expiration is 1 hour.
      localStorage.setItem("tokenExpiration", tokenExpiration);
      navigate("/home");
    } catch (e: any) {
      if (
        e.response.data.message === "Wrong Password!" ||
        e.response.data.message ===
          "Girilen Email ile kayıtlı kullanıcı bulunamadı."
      )
        setError(e.response.data.message);
      else setError("Bilinmeyen bir hata oluştu.");
    }
  };

  return (
    <Layout style={{ justifyContent: "center" }}>
      <Card size="md">
        <Text fontSize="xxl" bold style={{ alignSelf: "center" }}>
          Giriş
        </Text>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            label="Email"
          />
          <Input
            name="password"
            id="password"
            type="password"
            placeholder="Şifre"
            label="Şifre"
          />
          <Button variant="primary" type="submit">
            Giriş Yap
          </Button>
          {error && (
            <Text color="fail" style={{ marginTop: "-1rem" }}>
              {error}
            </Text>
          )}
        </Form>
        <Text fontSize="s" style={{ alignSelf: "flex-start" }}>
          Hesabınız mı yok?{" "}
          <Link to="/register" style={{ color: "#01C2FF" }}>
            Yeni bir hesap oluşturun!
          </Link>{" "}
        </Text>
        <Text
          fontSize="s"
          style={{ alignSelf: "flex-start", marginTop: "-1rem" }}
        >
          <Link to="/forgotPassword" style={{ color: "#01C2FF" }}>
            Şifremi unuttum
          </Link>
        </Text>
      </Card>
    </Layout>
  );
};

export default Login;
