export default function WelcomeContent({ assistantName, intro }) {
  return (
    <>
      Hello! I'm your <strong>{assistantName}</strong>.
      <br />
      <br />
      {intro}
    </>
  );
}
