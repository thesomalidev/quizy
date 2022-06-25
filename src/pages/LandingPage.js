import { Button, Badge, Burger } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [opened, setOpened] = React.useState(false);
  const navigate = useNavigate();
  const title = opened ? "Close navigation" : "Open navigation";

  return (
    <header>
      <div className="content-desktop">
        <div>
          <Badge size="lg" radius={10} color="blue">
            challenging quizes!
          </Badge>
        </div>
        <div>
          <Button
            color="blue"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>{" "}
        </div>
      </div>

      <div className="content-mobile">
        <Burger
          opened={opened}
          onClick={() => setOpened(o => !o)}
          title={title}
        />
      </div>
    </header>
  );
}
