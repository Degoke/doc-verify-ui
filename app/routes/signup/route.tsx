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
import { AppTitle } from '../index/Title';

  export async function action({ request }: ActionArgs) {
    const formData = Object.fromEntries(await request.formData())
    const { email, password } = formData

    const errors: Record<string, any> = {
        email: validateEmail(email),
        password: validatePassword(password)
    }

    let res = await fetch("http://localhost:8080/api/v1/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    if (res.status === 201) {
      return redirect("/login");
    }

    let data = await res.json();

    if (data.statusCode === 400) {
      if (Array.isArray(data.message)) {
          data.message.forEach((message: string) => {
              const errorKey = message.split(' ')[0];
              errors[errorKey] = message;
            });
              return json({ data, errors, status: res.status, message: data.message ? data.message : res.statusText});
      }
  }
  
  return json({ data, status: res.status, message: data.message ? data.message : res.statusText});

    
  }
  
  export default function Register() {
    const data = useActionData()
    console.log(data)
    return (
      <Container size={420} my={40}>
        <AppTitle align="center" />
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Welcome!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Link to="/login">
          <Anchor size="sm" component="button">
            Sign in
          </Anchor>
          </Link>
        </Text>
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Form method='post'>
          <TextInput name="email" id="email" type="email" label="Email" placeholder="you@vate.com" required mt="md" icon={<IconAt size="0.8rem" />} />
          <PasswordInput name="password" id="password" label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          
          <Button type="submit" fullWidth mt="xl">
            Create Account
          </Button>
          </Form>
        </Paper>
      </Container>
    );
  }