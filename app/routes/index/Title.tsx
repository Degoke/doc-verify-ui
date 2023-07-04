import { Text } from "@mantine/core"
export function AppTitle(props: any) {
    return (
        <Text variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} fz="xl" fw={700} {...props}>DOC-VERIFY</Text>
    )
}