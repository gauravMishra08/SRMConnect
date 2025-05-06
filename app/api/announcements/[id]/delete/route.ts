import { NextResponse } from "next/server"
import { deleteAnnouncement } from "@/lib/actions"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const result = await deleteAnnouncement(id)

    if (!result.success) {
      return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting announcement:", error)
    return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
  }
}
