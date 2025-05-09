export default interface INotification {
    NotificationID: number;
    UserEmail: string;
    Message: string;
    NotificationType: string;
    SentAt: Date;
}