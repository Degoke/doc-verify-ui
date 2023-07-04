import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
import type { ActionArgs} from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { useActionData } from 'react-router';
  import { IconAt } from '@tabler/icons-react'
import { validateEmail, validatePassword } from '~/utils/validations';
import { commitSession, getSession } from '~/sessions';
import { AppTitle } from '../index/Title';

  export async function action({ request }: ActionArgs) {
    const formData = Object.fromEntries(await request.formData())

    const { email, password } = formData;

    const errors: Record<string, string | undefined> = {
        email: validateEmail(email),
        password: validatePassword(password)
    }

    if (Object.values(errors).some(Boolean)) {
      return json({ errors }, { status: 400 })
    }

    const session = await getSession(
      request.headers.get("cookie")
    )


    let res = await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password})
    })

    let data = await res.json();
    if (res.status === 200) {
      console.log(data)
      session.set("token", data.data.token)
      console.log(session.data)
      return redirect("/dashboard", {
        headers: {
          "Set-Cookie": await commitSession(session)
        }
      });
    }

    

    if (res.status === 400) {
      if (Array.isArray(data.message)) {
          data.message.forEach((message: string) => {
              const errorKey = message.split(' ')[0];
              errors[errorKey] = message;
            });
              return json({ data, errors, status: res.status, message: data.message ? data.message : res.statusText});
      }
  }
  
  return json(data);

  }
  
  export default function Login() {
    const data = useActionData()
    console.log(data)
    return (
      <Container size={420} my={40}>
        <AppTitle align="center" />
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Link to="/signup">
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
          </Link>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Form method='post'>
          <TextInput name="email" id="email" type="email" label="Email" placeholder="you@vate.com" required icon={<IconAt size="0.8rem" />} />
          <PasswordInput name="password" id="password" label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
          </Form>
        </Paper>
      </Container>
    );
  }