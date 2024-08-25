import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_registration_email(email: str, username: str):
    smtp_server = "v2006.coreserver.jp"
    smtp_port = 587
    smtp_user = "iyayo@zeldec.com"
    smtp_password = "Yuma9663"

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = email
    msg["Subject"] = "avs 会員登録完了のお知らせ"

    body = f"{username}様,\n\n ご登録ありがとうございます。"
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, email, msg.as_string())
