import os
from email.message import EmailMessage
from dotenv import load_dotenv
import aiosmtplib

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_USERNAME")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

async def send_reset_email(to_email: str, reset_link: str):
    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = "Password Reset"
    msg.set_content(f"Click the link to reset your password: {reset_link}")

    await aiosmtplib.send(
        msg,
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True,
        username=EMAIL_ADDRESS,
        password=EMAIL_PASSWORD
    )