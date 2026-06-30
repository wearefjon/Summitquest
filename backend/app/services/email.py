import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import get_settings

settings = get_settings()

def send_email_smtp(to_email: str, subject: str, html_content: str):
    if not settings.smtp_username or not settings.smtp_password:
        print("Warning: SMTP credentials not set. Skipping email.")
        return False
        
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = settings.email_from
    msg["To"] = to_email

    part2 = MIMEText(html_content, "html")
    msg.attach(part2)

    try:
        server = smtplib.SMTP(settings.smtp_host, settings.smtp_port)
        server.starttls()
        server.login(settings.smtp_username, settings.smtp_password)
        server.sendmail(settings.email_from, to_email, msg.as_string())
        server.quit()
        print(f"SMTP email sent to {to_email}")
        return True
    except Exception as e:
        print(f"Error sending SMTP email: {e}")
        return False

async def send_booking_confirmation(
    customer_email: str,
    customer_name: str,
    tour_name: str,
    tour_date: str,
    travelers: int,
    total_paid: float,
    booking_id: str
):
    html_content = f"""
    <h2>Booking Confirmation: {tour_name}</h2>
    <p>Hi {customer_name},</p>
    <p>Your booking (ID: <strong>{booking_id}</strong>) is confirmed!</p>
    <ul>
        <li><strong>Date:</strong> {tour_date}</li>
        <li><strong>Travelers:</strong> {travelers}</li>
        <li><strong>Total Paid:</strong> ₹{total_paid:,.2f}</li>
    </ul>
    <p>Get ready for your adventure!</p>
    <p>Best,<br>The SummitQuest Team</p>
    """
    
    return send_email_smtp(
        to_email=customer_email,
        subject=f"Booking Confirmed: {tour_name}",
        html_content=html_content
    )

async def send_operator_approval_email(operator_email: str, operator_name: str):
    html_content = f"""
    <h2>You're Approved!</h2>
    <p>Hi {operator_name},</p>
    <p>Great news! Your operator account on SummitQuest has been approved by our admin team.</p>
    <p>You can now log into your dashboard and start listing your adventures and tourist centers to thousands of travelers.</p>
    <p><a href="https://summitquest.in/operator">Go to Dashboard</a></p>
    <p>Welcome aboard!<br>The SummitQuest Team</p>
    """

    return send_email_smtp(
        to_email=operator_email,
        subject="Your Operator Account is Approved!",
        html_content=html_content
    )
