import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")

async def send_booking_confirmation(
    customer_email: str,
    customer_name: str,
    tour_name: str,
    tour_date: str,
    travelers: int,
    total_paid: float,
    booking_id: str
):
    if not resend.api_key:
        print("Warning: RESEND_API_KEY is not set. Skipping booking confirmation email.")
        return False

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

    try:
        r = resend.Emails.send({
            "from": "SummitQuest <bookings@summitquest.in>",
            "to": [customer_email],
            "subject": f"Booking Confirmed: {tour_name}",
            "html": html_content
        })
        print(f"Resend email sent: {r}")
        return True
    except Exception as e:
        print(f"Error sending Resend email: {e}")
        return False

async def send_operator_approval_email(operator_email: str, operator_name: str):
    if not resend.api_key:
        print("Warning: RESEND_API_KEY is not set. Skipping operator approval email.")
        return False
        
    html_content = f"""
    <h2>You're Approved!</h2>
    <p>Hi {operator_name},</p>
    <p>Great news! Your operator account on SummitQuest has been approved by our admin team.</p>
    <p>You can now log into your dashboard and start listing your adventures and tourist centers to thousands of travelers.</p>
    <p><a href="https://summitquest.in/operator">Go to Dashboard</a></p>
    <p>Welcome aboard!<br>The SummitQuest Team</p>
    """

    try:
        r = resend.Emails.send({
            "from": "SummitQuest <onboarding@summitquest.in>",
            "to": [operator_email],
            "subject": "Your Operator Account is Approved!",
            "html": html_content
        })
        print(f"Resend approval email sent: {r}")
        return True
    except Exception as e:
        print(f"Error sending Resend email: {e}")
        return False
