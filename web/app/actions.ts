"use server";

/**
 * Do the server action and return the status
 */
export async function doServerAction(sessionIdToken: string): Promise<{
  status: "success" | "error";
  data?: {
    shop: string;
  };
}> {
  try {
    return {
      status: "success",

    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
    };
  }
}
