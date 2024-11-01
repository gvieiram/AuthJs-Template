import { BASE_URL, resendDefault } from "@/constants";
import { publicRoutes } from "@/routes";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties } from "react";

interface VerificationTokenEmailProps {
  redirectUrl: string;
  tokenExpirationTime: number;
  websiteName: string;
  websiteUrl: string;
}

export const VerificationTokenEmail = ({
  redirectUrl,
  tokenExpirationTime,
  websiteName,
  websiteUrl,
}: VerificationTokenEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Verifique seu e-mail para continuar o processo de cadastro
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Heading style={h1}>{websiteName}</Heading>
            <Heading style={subtitle}>
              Olá, é um prazer ter você em nossa plataforma! Por favor,
              verifique seu e-mail para continuar o processo de cadastro.
            </Heading>
          </Section>

          <Button style={button} href={redirectUrl}>
            Clique para continuar o cadastro
          </Button>

          <Text style={text}>
            Este link e código serão válidos somente pelos próximos{" "}
            {tokenExpirationTime} minutos. Se o link não funcionar, você pode
            copiar e colar a seguinte URL no seu navegador:
          </Text>
          <code style={code}>
            <Link style={link} target="_blank" href={redirectUrl}>
              {redirectUrl}
            </Link>
          </code>

          <Text
            style={{
              ...text,
              color: "#ababab",
              marginTop: "14px",
              marginBottom: "16px",
            }}
          >
            Se você não tentou realizar o cadastro, você pode ignorar este
            e-mail.
          </Text>

          <Hr />
          <Text style={footer}>
            <Link
              href={websiteUrl}
              target="_blank"
              style={{ ...link, color: "#898989" }}
            >
              {websiteName}
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

VerificationTokenEmail.PreviewProps = {
  redirectUrl: `${BASE_URL}${publicRoutes.REGISTER_DETAILS}?code=0800-0800-0800-0800`,
  tokenExpirationTime: 10,
  websiteName: resendDefault.projectName,
  websiteUrl: BASE_URL,
} as VerificationTokenEmailProps;

export default VerificationTokenEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
} as CSSProperties;

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "10px",
  boxShadow: "0 0px 10px #E6E6E6",
  padding: "0 20px",
  margin: "20px auto",
} as CSSProperties;

const h1 = {
  color: "#00CC66",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "36px",
  fontWeight: "700",
  padding: "0",
  textAlign: "center" as const,
} as CSSProperties;

const subtitle = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  marginBottom: "24px",
} as CSSProperties;

const button = {
  backgroundColor: "#00CC66",
  borderRadius: "8px",
  fontWeight: "600",
  color: "#fff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
} as CSSProperties;

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
} as CSSProperties;

const text = {
  ...subtitle,
  margin: "24px 0",
} as CSSProperties;

const footer = {
  color: "#898989",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
} as CSSProperties;

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
} as CSSProperties;
