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

export default function Login() {
  const form = useForm({
    initialValues: {
      username: "",
      password: ""
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
      <Container size="xs" px="xl">
        <form onSubmit={form.onSubmit(onSubmit)}>
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
            <Button type="submit" onClick={onSubmit}>
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
          <Button leftIcon={<FcGoogle />} variant="outline" size="lg" fullWidth>
            Continue with Google
          </Button>
        </Center>
      </Container>
    </AppShell>
  );
}
