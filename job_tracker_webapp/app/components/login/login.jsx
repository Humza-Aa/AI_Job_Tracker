import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Button>
        <Link href="http://localhost:5000/auth/google">Sign</Link>
      </Button>
    </>
  );
}
