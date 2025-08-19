import { getWebRequest } from "@tanstack/react-start/server";
import { isAdminEmail } from "~/lib/config";
import { auth } from "../server/auth";

export async function isUserAdmin(): Promise<boolean> {
  const request = getWebRequest();

  if (!request?.headers) {
    return false;
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user?.email) {
    return false;
  }

  return isAdminEmail(session.user.email);
}
