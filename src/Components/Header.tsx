export default function Header() {
  const navigation = ["Home", "About", "Travel"];
  return (
    <header>
      <h1>Travel To Georgia</h1>
      <nav>
        {navigation.map((item) => (
          <p>{item}</p>
        ))}
      </nav>
    </header>
  );
}
