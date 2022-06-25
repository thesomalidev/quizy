import { Text, Container, Anchor, Grid, MediaQuery, Image, Button, Chip } from '@mantine/core';
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();

    return (
        <section id="about">
            <Container fluid>
                <Grid justify="center" align="center">

                    <Grid.Col sm={12} md={8} lg={8}>
                        <div style={{ marginBottom: 25 }}>
                            <Text>
                                <MediaQuery
                                    query="(max-width: 1200px)"
                                    styles={{ fontSize: '2.5rem !important' }}
                                >
                                    <h1 className="title">Quizy</h1>
                                </MediaQuery>
                            </Text>
                        </div>
                        <div style={{ marginBottom: 25 }}>
                            <Text size="xl" color="black">
                                Simple showcase of this powerful and well implemented library called <Anchor href="https://mantine.dev/" target="_blank">Mantine</Anchor>.
                            </Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 25 }}>
                            <Chip value="typescript" checked color="blue">challenges</Chip>
                            <Chip value="hooks" checked color="blue">quiz</Chip>
                            <Chip value="hooks" checked color="blue">competitions</Chip>
                        </div>
                        <Button color="green" size='lg' rightIcon={<MdArrowForward size={16} />} onClick={()=> navigate("/auth/register")}>Get Started now</Button>
                    </Grid.Col>

                    <Grid.Col sm={12} md={4} lg={4} className="center-mobile">
                        <Image src='/images/lime-travel.png' alt="Logo" />
                    </Grid.Col>

                </Grid>
            </Container>

        </section>
    );
};