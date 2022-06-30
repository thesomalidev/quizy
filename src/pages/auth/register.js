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
import {
  createAuthUserWithEmailAndPassword,
  createUserFromAuth
} from "../../utils/firebase";

export default function Login() {
  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      repeatPassword: ""
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      fullname: value => (!value ? "Name is required" : null),
      password: value =>
        !value || value.length < 6
          ? "Password is required and must at leaset be 6 digits"
          : null,
      repeatPassword: value => {
        const { value: password } = form.getInputProps("password");
        if (password && value && value !== password) {
          return "Passwords should match";
        } else {
          if (!value) {
            return "This field is required";
          }
        }
      }
    }
  });
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    const result = form.validate();
    if (!result.hasErrors) {
      await registerUser(form.values);
    }
  };

  const registerUser = async ({ fullname, email, password }) => {
    try {
      setLoading(true);
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      user.displayName = fullname;
      await createUserFromAuth(user);
      setLoading(false);
      form.reset()
    } catch (error) {
      setLoading(false);
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
      <Container size="xs" px="xs">
        <form onSubmit={onSubmit}>
          <TextInput
            required
            label="Name"
            placeholder="Type Full name"
            {...form.getInputProps("fullname")}
          />
          <TextInput
            required
            label="Email"
            type="email"
            placeholder="Type your email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            required
            label="Repeat Password"
            placeholder="repeat the above password"
            {...form.getInputProps("repeatPassword")}
          />

          <Group position="right" mt="md">
            <Button type="submit" onClick={onSubmit} loading={isLoading}>
              Submit
            </Button>
          </Group>
          <Text>
            Already have an account?{" "}
            <Anchor to="/auth/login" component={Link}>
              Login
            </Anchor>
          </Text>
        </form>
      </Container>
    </AppShell>
  );
}
