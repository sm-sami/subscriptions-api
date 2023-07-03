import * as React from "react";
import {
  Html,
  Head,
  Font,
  Preview,
  Tailwind,
  Body,
  Container,
  Heading,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  baseUrl: string;
  name: string;
  email: string;
  code: string;
}

const VerificationEmail = ({
  baseUrl,
  name,
  email,
  code,
}: VerificationEmailProps) => {
  const url = `${baseUrl}/user/verify?email=${email}&code=${code}`;

  return (
    <Html lang="en">
      <Head>
        <title>Verification Email</title>
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmsans/v13/rP2Hp2ywxg089UriCZOIHQ.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Preview>Verify your email address to complete your subscription</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded mt-[40px] mb-[5px] mx-auto p-[20px] w-[465px]">
            <Section>
              <Heading>Confirm your subscription</Heading>
              <Text className="text-lg">Hello {name}!,</Text>
              <Text className="text-lg">
                Thanks for subscribing to <b>subscriptions-api</b>! You are one
                step away from completing your subscription. Click the button
                below to verify your email.
              </Text>
              <Button
                href={url}
                className="bg-black font-bold text-white px-[20px] py-[10px] rounded mt-[10px]"
              >
                Verify
              </Button>
            </Section>
            <Section className="flex justify-center mt-[20px]">
              <Text className="text-gray-600">
                If you did not request this email, please ignore it.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VerificationEmail;
