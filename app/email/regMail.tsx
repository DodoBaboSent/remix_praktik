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
            <Img src="https://remix-praktik.onrender.com/assets/logoDVAGP.gif" alt="logo" style={{width: 100}} />
          </div>
          <Heading as="h1">Подтвердите активацию аккаунта</Heading>
        </Head>
        <Link
          href={`https://remix-praktik.onrender.com/activate/${props.id}`}
          style={{
            padding: "1rem",
            backgroundColor: "#2a4054",
            borderRadius: 5,
            color: "white",
          }}
        >
          Активировать
        </Link>
      </Html>
    </>
  );
}
