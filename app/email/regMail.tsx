import { Link, Heading, Html, Head, Img } from "@react-email/components";

type EmailProps = {
  id?: string;
};

export function Email(props: EmailProps) {
  return (
    <>
      <Html lang="ru">
        <Head style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Img src="./files/logoDVAGP.gif" alt="logo" style={{width: 100}} />
          </div>
          <Heading as="h1">Подтвердите активацию аккаунта</Heading>
        </Head>
        <Link
          href={`https://example.com/activate/${props.id}`}
          style={{
            padding: "1rem",
            backgroundColor: "#2a4054",
            borderRadius: 5,
          }}
        >
          Активировать ({`activate/${props.id}`})
        </Link>
      </Html>
    </>
  );
}
