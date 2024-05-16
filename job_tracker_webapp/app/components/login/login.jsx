import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Button>
        <Link href="/login">Sign</Link>
      </Button>
    </>
  );
}
