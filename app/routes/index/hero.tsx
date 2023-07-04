import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons-react';
  import image from "./image.svg"
import { Link } from '@remix-run/react';
  
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: `calc(${theme.spacing.xl} * 4)`,
      paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },
  
    content: {
      maxWidth: rem(480),
      marginRight: `calc(${theme.spacing.xl} * 3)`,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: rem(44),
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: rem(28),
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: `${rem(4)} ${rem(12)}`,
    },
  }));
  
  export function Hero() {
    const { classes } = useStyles();
    return (
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Identity <span className={classes.highlight}>Document</span> Verification For You
              </Title>
              <Text color="dimmed" mt="md">
              Ai verification of identity documents, using the fields you want to verify, an image of the document and a selfie.
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck size={rem(12)} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>API and User Dashboard</b> – Easy to use API's and a dashboard to monitor your verifications
                </List.Item>
                <List.Item>
                  <b>SDK's For your Stacks</b> – Seamless integration with your favourite stacks with our SDK's
                </List.Item>
                <List.Item>
                  <b>Open Source</b> – Open source and can be self hosted
                </List.Item>
              </List>
  
              <Group mt={30}>
                <Link to={"/signup"}>
                <Button radius="xl" size="md" className={classes.control}>
                  Get started
                </Button>
                </Link>
                <Button variant="default" radius="xl" size="md" className={classes.control}>
                  API Docs
                </Button>
              </Group>
            </div>
            <Image src={image} className={classes.image} />
          </div>
        </Container>
      </div>
    );
  }