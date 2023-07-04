import { Flex } from "@mantine/core";
import type { LoaderArgs} from "@remix-run/node";
import { redirect , json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getSession } from "~/sessions";
import { NavBar } from "./Navbar"

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(
        request.headers.get("cookie")
    )
    const token = session.get("token")

    if (!token) {
        return redirect("/login")
    }
    const res = await fetch("http://localhost:8080/api/v1/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()
    if (data.success === false) {
        return redirect("/login")
    }
    return json(data)
}

export default function Dashboard() {
    const data = useLoaderData<typeof loader>();
    console.log(data);
    return (
        <Flex gap="md" wrap="wrap">
            <NavBar user={data.data} />
            <Outlet />
        </Flex>
    )
}