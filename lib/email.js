import * as brevo from "@getbrevo/brevo";

// Initialize Brevo API
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

/**
 * Send appointment notification email to doctor
 * @param {Object} params - Email parameters
 * @param {string} params.doctorEmail - Doctor's registered email from User table
 * @param {string} params.doctorName - Doctor's name from User table
 * @param {string} params.patientName - Patient's name
 * @param {Date} params.startTime - Appointment start time
 * @param {Date} params.endTime - Appointment end time
 */
export async function sendDoctorAppointmentEmail({
  doctorEmail,
  doctorName,
  patientName,
  startTime,
  endTime,
}) {
  try {
    console.log("📧 Sending appointment email to:", doctorEmail);

    const sendSmtpEmail = {
      sender: {
        email: "jainilp968@gmail.com", // Your verified sender email
        name: "ArogyaMitra Health Platform",
      },
      to: [
        {
          email: doctorEmail, // ✅ Doctor's actual email from database
          name: doctorName || "Doctor",
        },
      ],
      subject: `📅 New Appointment Scheduled - ${new Date(
        startTime
      ).toLocaleDateString("en-IN")}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
            }
            .greeting {
              font-size: 18px;
              color: #2c3e50;
              margin-bottom: 20px;
            }
            .appointment-card {
              background: #f8f9fa;
              border-left: 4px solid #667eea;
              padding: 20px;
              margin: 20px 0;
              border-radius: 5px;
            }
            .appointment-card p {
              margin: 10px 0;
              font-size: 15px;
            }
            .appointment-card strong {
              color: #2c3e50;
              display: inline-block;
              width: 100px;
            }
            .detail-value {
              color: #667eea;
              font-weight: 600;
            }
            .cta-button {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 14px 30px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
              font-weight: 600;
              transition: background 0.3s;
            }
            .cta-button:hover {
              background: #5568d3;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px;
              text-align: center;
              color: #666;
              font-size: 13px;
              border-top: 1px solid #e0e0e0;
            }
            .footer p {
              margin: 5px 0;
            }
            .divider {
              height: 1px;
              background: #e0e0e0;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header -->
            <div class="header">
              <h1>🏥 ArogyaMitra</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Healthcare Appointment System</p>
            </div>

            <!-- Content -->
            <div class="content">
              <p class="greeting">Hello <strong>Dr. ${doctorName}</strong>,</p>
              
              <p>You have a new appointment scheduled with the following details:</p>

              <!-- Appointment Details Card -->
              <div class="appointment-card">
                <p>
                  <strong>👤 Patient:</strong>
                  <span class="detail-value">${patientName}</span>
                </p>
                <p>
                  <strong>📅 Date:</strong>
                  <span class="detail-value">
                    ${new Date(startTime).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  <strong>🕐 Time:</strong>
                  <span class="detail-value">
                    ${new Date(startTime).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })} - ${new Date(endTime).toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}
                  </span>
                </p>
              </div>

              <div class="divider"></div>

              <p style="color: #555;">
                Please log in to your ArogyaMitra dashboard to view complete appointment details and prepare for the consultation.
              </p>

              <div style="text-align: center;">
                <a href="${
                  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
                }/doctor/appointments" class="cta-button">
                  View Dashboard →
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p><strong>ArogyaMitra Health Platform</strong></p>
              <p>This is an automated notification email</p>
              <p>© ${new Date().getFullYear()} ArogyaMitra. All rights reserved.</p>
              <p style="margin-top: 10px; font-size: 11px; color: #999;">
                If you have any questions, please contact support
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email via Brevo
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully to", doctorEmail);
    console.log("📨 Brevo Response:", response);

    return { success: true, messageId: response.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);

    // Log detailed error for debugging
    if (error.response) {
      console.error("Brevo API Error:", error.response.body);
    }

    // Don't throw error - let appointment booking succeed even if email fails
    return { success: false, error: error.message };
  }
}
