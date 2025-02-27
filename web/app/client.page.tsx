"use client";

import { useAppBridge } from "@shopify/app-bridge-react";
import { Button, LegacyCard as Card, Page, Text } from "@shopify/polaris";
import Link from "next/link";
import { useState } from "react";

interface Data {
  name: string;
  height: string;
}

export default function Home() {
  console.log(88888);

  const [data, setData] = useState<Data | null>(null);
  const [serverActionResult, setServerActionResult] = useState<{
    status: "success" | "error";
  }>();

  const app = useAppBridge();

  const handleGetAPIRequest = async () => {
    try {
      // global fetch has tokens automatically added
      // https://shopify.dev/docs/api/app-bridge-library/apis/resource-fetching
      const response = await fetch("/api/hello");
      const result = (await response.json()) as { data: Data };
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page title="Home">
      <div className="flex items-center justify-center gap-1 p-2 bg-slate-800 text-white rounded-lg mb-2 shadow-lg">
        <p className="font-medium text-[1rem]">
          We can also use tailwindcss in this project!
        </p>
      </div>
      <Card
        sectioned
        title="NextJs API Routes"
        primaryFooterAction={{
          content: "Call API",
          onAction: handleGetAPIRequest,
        }}
      >
        <Text as="p" variant="bodyMd">
          Call a NextJS api route from within your app. The request is verified
          using session tokens.
        </Text>
        {data && (
          <Text as="h1" variant="headingSm">
            {data.name} is {data.height} tall.
          </Text>
        )}
      </Card>

      <Card
        sectioned
        title="React server actions"
        primaryFooterAction={{
          content: "Server action",
          onAction: async () => {
            const token = await app.idToken();
          },
        }}
      >
        <Text as="p" variant="bodyMd">
          Call a server action from within your app. The request is verified
          using session tokens.
        </Text>
        {serverActionResult && serverActionResult.status === "success" && (
          <Text as="h1" variant="headingSm">
            Server action was successful.
          </Text>
        )}
        {serverActionResult && serverActionResult.status === "error" && (
          <Text as="h1" variant="headingSm">
            Server action failed.
          </Text>
        )}
      </Card>

      <Card sectioned title="Use Tanstack Query to query Shopify GraphQL">
        <Text as="p" variant="bodyMd">
          Use Tanstack Query to query Shopify&apos;s GraphQL API directly from
          the client.
        </Text>
      </Card>

      <Card sectioned title="Shopify App Bridge">
        <Text as="p" variant="bodyMd">
          Use the direct graphql api provided by Shopify App Bridge. This
          automatically uses an authenticated graphql route, no need to add
          tokens.
        </Text>
        <Button
          onClick={async () => {
            const res = await fetch("shopify:admin/api/graphql.json", {
              method: "POST",
              body: JSON.stringify({
                query: /* GraphQL */ `
                  query {
                    shop {
                      name
                    }
                  }
                `,
              }),
            });
            const { data } = await res.json();
            console.log("graphql response", data);
          }}
        >
          GraphQL Query - Check the console for the response
        </Button>
      </Card>

      <Card sectioned title="Shopify App Bridge">
        <Text as="p" variant="bodyMd">
          Use Shopify App Bridge to interact with the Shopify admin. The request
          uses offline session tokens. This uses Shopify App Bridge v4.
        </Text>
        <Link href="/new">New page using next/link</Link>
      </Card>
    </Page>
  );
}
