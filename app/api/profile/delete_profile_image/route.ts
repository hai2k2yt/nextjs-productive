import {getAuthSession} from "@/lib/auth";
import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function POST() {
  const session = await getAuthSession()

  if(!session?.user) {
    return new Response("Unauthorized", {
      status: 400,
      statusText: "Unauthorized user"
    })
  }

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    if(!user) {
      return new NextResponse("User not found", {status: 404, statusText: "User not found"})
    }

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: null
      }
    })

    return NextResponse.json(updatedUser, {status: 200})
  } catch (_) {
    return NextResponse.json("ERRORS.DB_ERROR", {status: 405})
  }
}