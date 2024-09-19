import unittest
import requests


class TestAPI(unittest.TestCase):
    BASE_URL = "http://localhost:4000/"

    test_data = [
        {"email": "", "expected_label": "applied"},
        {"email": "You have been invited for an interview",
         "expected_label": "interview"},
        {"email": "Unfortunately, we will not proceed with your application",
         "expected_label": "rejected"},
        {"email": "You have received a job offer", "expected_label": "offer"},
        {"email": "We are reviewing your resume", "expected_label": "screening"},
    ]

    def test_Email_Classify(self):
        """Test how well you can classify emails"""
        for data in self.test_data:
            with self.subTest(email=data["email"]):
                response = requests.post(
                    f"{self.BASE_URL}/classify", json={"text": data["email"]})
                self.assertEqual(response.status_code, 200)
                self.assertEqual(
                    response.json()["classification"], data["expected_label"])


if __name__ == "__main__":
    unittest.main()
