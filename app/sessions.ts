import { createCookieSessionStorage } from "@remix-run/node"

type SessionData = {
    userId: string
    token: string
}
type SessionFlashData = {
    error: string
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>(
    {
        cookie: {
            name: "__session",
            httpOnly: true,
            secure: true,
        }
    }
)

export { getSession, commitSession, destroySession };