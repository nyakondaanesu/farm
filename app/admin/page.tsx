import MessagesHome from "../(components)/messages";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const AdminPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="container mx-auto p-6">
      <MessagesHome />
    </div>
  );
};

export default AdminPage;
