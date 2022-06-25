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
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Login() {
  const form = useForm({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      repeatPassword: ""
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : "Invalid email")
    }
  });

  const onSubmit = values => {
    console.log(values);
    const result = form.validate();
    if (result.hasErrors) {
      console.error(result.errors);
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
        <form onSubmit={form.onSubmit(onSubmit)}>
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
            <Button type="submit" onClick={onSubmit} disabled={!form.errors}>
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
        <br />
        <Center>
          <Button leftIcon={<FcGoogle />} variant="outline" size="lg" fullWidth>
            Continue with Google
          </Button>
        </Center>
      </Container>
    </AppShell>
  );
}
