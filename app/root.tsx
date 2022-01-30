import {
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./styles/app.css";
import Layout from "./components/layout";
import { Theme, ThemeProvider, useTheme } from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.sever";
import NavBar from "./components/navbar";

export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return { title: "Welcome" };
};

function App() {
  const [theme] = useTheme();
  return (
    <html lang="en" className={theme ? theme : "dark"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen transition-all duration-300 bg-white dark:bg-gray-900">
        <header>
          <NavBar />
        </header>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function AppWithProvider() {
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
