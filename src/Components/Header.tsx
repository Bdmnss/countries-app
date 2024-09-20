export default function Header() {
  const navigation = ["Home", "About", "Travel"];
  return (
    <header>
      <h1>Travel To Georgia</h1>
      <nav>
        {navigation.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </nav>
    </header>
  );
}
