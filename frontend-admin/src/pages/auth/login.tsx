import LoginForm from "../../components/forms/login";

export default function LoginPage() {
  return (
    <section className="h-screen">
      <div className="g-6 flex h-full items-center justify-center bg-red-300">
        <LoginForm />
      </div>
    </section>
  );
}
