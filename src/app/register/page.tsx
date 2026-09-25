import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { SERVER_IP } from "@/lib/data";

const STEPS = [
  {
    title: "Join the Server",
    description: (
      <>
        Connect to <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-primary">{SERVER_IP}</code>{" "}
        in Minecraft
      </>
    ),
  },
  {
    title: "Run the Command",
    description: (
      <>
        Use{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-primary">
          /register your-email
        </code>{" "}
        in-game
      </>
    ),
  },
  {
    title: "Check Your Email",
    description: "Click the link in the email to complete registration",
  },
];

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create Account"
      subtitle="Register your Seiky account"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </>
      }
    >
      <ol className="flex flex-col gap-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex items-start gap-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">{step.title}</p>
              <p className="mt-0.5 text-sm text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </AuthCard>
  );
}
