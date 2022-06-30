import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  PasswordInput,
  Container,
  AppShell,
  Header,
  Text,
  Anchor,
  Center,
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  createUserFromAuth,
  signinUserWithEmailAndPassword,
  signInWithGooglePopup
} from "../../utils/firebase";

export default function Login() {
  const form = useForm({
    initialValues: {
      username: "",
      password: ""
    },

    validate: {
      username: value => value ? null : "Email or UserName is required"
    }
  });
  const [isLoading, setLoading] = useState(false);
  const [isGoogleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    const result = form.validate();
    console.log(result.errors, form.values);
    if (!result.hasErrors) {
      try {
        setLoading(true);
        const { username: email, password } = form.values;
        console.log(await signinUserWithEmailAndPassword(email, password));
        setLoading(false);
        form.reset()
      } catch (error) {
        setLoading(false);
        console.error(error);
        if(error.code === 'auth/wrong-password') {
          form.setErrors({ password: 'Wrong Passwrod' });
        } else if(error.code === 'auth/invalid-email') {
          form.setErrors({ username: 'Invalid username or email.' });
        }
      }
    }
  };

  const signupWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      const { user } = await signInWithGooglePopup();
      await createUserFromAuth(user);
      setGoogleLoading(false);
    } catch (error) {
      setGoogleLoading(false);
      console.error(error);
    }
  };

  return (
    <AppShell
      padding="md"
      header={
        <Header p="lg">
          {
            <Center>
              <Anchor href="/">
                <Title>Welcome to Quizy</Title>
              </Anchor>
            </Center>
          }
        </Header>
      }
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
    >
      <Container size="xs" px="xl">
        <form onSubmit={onSubmit}>
          <TextInput
            required
            label="Username"
            placeholder="email or username"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="password"
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="md">
            <Button type="submit" onClick={onSubmit} loading={isLoading}>
              Submit
            </Button>
          </Group>
          <Text>
            Don't have an account?{" "}
            <Anchor to="/auth/register" component={Link}>
              Register
            </Anchor>
          </Text>
        </form>
        <br />
        <Center>
          <Button
            leftIcon={<FcGoogle />}
            variant="outline"
            size="lg"
            fullWidth
            loading={isGoogleLoading}
            loaderPosition="right"
            onClick={signupWithGoogle}
          >
            Continue with Google
          </Button>
        </Center>
      </Container>
    </AppShell>
  );
}
