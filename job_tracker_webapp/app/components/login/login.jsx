import { Box, Button } from "@chakra-ui/react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Link href="http://localhost:5000/auth/google">
        <Button>
          Login with{" "}
          <span>
            <Box pl="6px">
              <FontAwesomeIcon icon={faGoogle} />
            </Box>
          </span>
        </Button>
      </Link>
    </>
  );
}
