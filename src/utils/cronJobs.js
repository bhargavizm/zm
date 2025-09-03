import cron from "node-cron";
import { triggerMessage } from "@/lib/mailer/triggerMessage";
import { SecuredService, EncryptedService } from "@/models/services";
import { connectDB } from "@/lib/mongoDB";

/**
 * Schedule automatic emails for expiring services.
 */
export const scheduleValidityReminders = () => {
  // Runs every day at 9:00 AM
  cron.schedule("0 9 * * *", async () => {
    try {
      await connectDB(); // Ensure DB is connected

      const today = new Date();
      const reminderDate = new Date();
      reminderDate.setDate(today.getDate() + 15); // 15 days before expiry

      // 🔹 Find Secured Services expiring in 15 days
      const securedExpiring = await SecuredService.find({
        renewalDate: {
          $gte: reminderDate.setHours(0, 0, 0, 0),
          $lte: reminderDate.setHours(23, 59, 59, 999),
        },
      }).populate("user");

      // 🔹 Find Encrypted Services expiring in 15 days
      const encryptedExpiring = await EncryptedService.find({
        renewalDate: {
          $gte: reminderDate.setHours(0, 0, 0, 0),
          $lte: reminderDate.setHours(23, 59, 59, 999),
        },
      }).populate("user");

      // Combine all expiring services
      const allExpiringServices = [...securedExpiring, ...encryptedExpiring];

      // 🔹 Send validity renewal emails
      for (const service of allExpiringServices) {
        if (service.user) {
          await triggerMessage(service.user, "validityRenewal", { index: 0 });
          console.log(`[Email] Sent validity reminder to ${service.user.email}`);
        }
      }

      console.log(`[Cron] Total emails sent: ${allExpiringServices.length}`);
    } catch (err) {
      console.error("[Cron Error]", err.message);
    }
  });
};
