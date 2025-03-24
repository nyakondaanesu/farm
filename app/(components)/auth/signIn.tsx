import { signIn } from "@/auth";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/admin" });
      }}
    >
      <button
        type="submit"
        className="bg-[#6f9f29] text-white px-4 py-2 rounded-full"
      >
        login
      </button>
    </form>
  );
}
