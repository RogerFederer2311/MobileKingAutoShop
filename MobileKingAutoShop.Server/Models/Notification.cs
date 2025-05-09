namespace MobileKingAutoShop.Server.Models
{
    public class Notification
    {
        public int NotificationID { get; set; } = 0;
        public string UserEmail { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string NotificationType { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.Now;

        public Notification()
        {

        }
        public Notification(
            int notificationID,
            string userEmail,
            string message,
            string notificationType,
            DateTime sentAt
            )
        {
            NotificationID = notificationID;
            UserEmail = userEmail;
            Message = message;
            NotificationType = notificationType;
            SentAt = sentAt;
        }
    }
}
