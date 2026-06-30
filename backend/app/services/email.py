import httpx
import os
import json

EMAILJS_SERVICE_ID = os.getenv("EMAILJS_SERVICE_ID", "service_ixk3v2o")
# The user hasn't provided public/private keys yet, we'll try without or use placeholders.
# EmailJS REST API requires a public key, service id, template id, and template params.
EMAILJS_PUBLIC_KEY = os.getenv("EMAILJS_PUBLIC_KEY", "")
EMAILJS_PRIVATE_KEY = os.getenv("EMAILJS_PRIVATE_KEY", "")

async def send_emailjs(template_id: str, template_params: dict):
    if not EMAILJS_PUBLIC_KEY:
        print("Warning: EMAILJS_PUBLIC_KEY is not set. Cannot send email.")
        return False
        
    url = "https://api.emailjs.com/api/v1.0/email/send"
    payload = {
        "service_id": EMAILJS_SERVICE_ID,
        "template_id": template_id,
        "user_id": EMAILJS_PUBLIC_KEY,
        "accessToken": EMAILJS_PRIVATE_KEY,
        "template_params": template_params
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(url, json=payload, headers={"Content-Type": "application/json"})
            if response.status_code == 200:
                print(f"Email sent successfully: {template_id}")
                return True
            else:
                print(f"Failed to send email: {response.text}")
                return False
        except Exception as e:
            print(f"Error sending email: {e}")
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
    # This matches the {{ }} variables in the template
    params = {
        "customer_email": customer_email,
        "customer_name": customer_name,
        "tour_name": tour_name,
        "tour_date": tour_date,
        "travelers": str(travelers),
        "total_paid": str(total_paid),
        "booking_id": booking_id
    }
    
    template_id = os.getenv("EMAILJS_TEMPLATE_CONFIRMATION")
    if template_id:
        await send_emailjs(template_id, params)
    else:
        print("Warning: EMAILJS_TEMPLATE_CONFIRMATION not set. Skipping email.")
